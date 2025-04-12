import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/client';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    private prisma: PrismaClient;

    constructor(private authService: AuthService) {
        this.prisma = new PrismaClient();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    }

    async create(email: string, password: string, roleId: number) {
        const hashedPassword = await this.authService.hashPassword(password);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role_id: roleId,
            },
            include: { role: true },
        });
    }
}