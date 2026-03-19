import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) { }

    async generateAccessToken(userId: string, email: string, role: string) {
        return this.jwtService.signAsync({
            sub: userId,
            email,
            role,
        });
    }

    async generateAuthTokens(userId: string, email: string, role: string) {
        const accessToken = await this.generateAccessToken(userId, email, role);

        const expiresAt = new Date();
        const days = Number(process.env.REFRESH_EXPIRES_IN_DAYS || 7);
        expiresAt.setDate(expiresAt.getDate() + days);

        const session = await this.prisma.refreshToken.create({
            data: {
                userId,
                expiresAt,
            }
        });

        return {
            accessToken,
            refreshToken: session.token,
        };
    }
}
