import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '../../prisma/generated/client';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    private prisma: PrismaClient;

    constructor(private jwtService: JwtService) {
        this.prisma = new PrismaClient();
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password } = loginDto;

        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });

        // If user doesn't exist or password is incorrect, throw an exception
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const payload = { email: user.email, sub: user.id, role: user.role.name };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role.name,
            },
        };
    }

    async validateUser(userId: number): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { role: true },
        });

        if (!user) {
            return null;
        }

        const { password, ...result } = user;
        return {
            ...result,
            role: user.role.name,
        };
    }

    // Helper method to hash passwords (useful for creating test users)
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}