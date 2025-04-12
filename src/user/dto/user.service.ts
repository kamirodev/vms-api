import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
    private prisma: PrismaClient;

    constructor(private authService: AuthService) {
        this.prisma = new PrismaClient();
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const { password, ...result } = user;
        return {
            ...result,
            role: user.role.name,
        };
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    }

    async create(email: string, password: string, roleId: number) {
        const hashedPassword = await this.authService.hashPassword(password);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role_id: roleId,
            },
            include: { role: true },
        });

        const { password: _, ...result } = user;
        return {
            ...result,
            role: user.role.name,
        };
    }
}