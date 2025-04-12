import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaClient } from '../../prisma/generated/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private prisma: PrismaClient;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
        });
        this.prisma = new PrismaClient();
    }

    async validate(payload: any) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: { role: true },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role.name,
        };
    }
}