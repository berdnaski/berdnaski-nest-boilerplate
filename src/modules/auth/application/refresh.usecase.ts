import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RefreshDto } from "../dto/refresh.dto";
import { PrismaService } from "src/shared/database/prisma.service";
import { TokenService } from "../token.service";

@Injectable()
export class RefreshUseCase {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
    ) { }

    async execute(dto: RefreshDto) {
        const session = await this.prisma.refreshToken.findUnique({
            where: { token: dto.refreshToken },
            include: { user: true }
        });

        if (!session || new Date() > session.expiresAt) {
            throw new UnauthorizedException('Invalid Session');
        }

        const accessToken = await this.tokenService.generateAccessToken(
            session.user.id,
            session.user.email,
            session.user.role
        );

        return { accessToken };
    }
}
