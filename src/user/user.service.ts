import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(
        private authService: AuthService,
        private prisma: PrismaService
    ) { }

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