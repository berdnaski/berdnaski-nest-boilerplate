import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { EmailAlreadyRegisteredException } from 'src/shared/exceptions/email-already-registered.exception';
import { IUserRepository } from '../users/domain/user.repository';
import { PasswordHasher } from 'src/shared/security/password-hasher';
import { PrismaService } from 'src/shared/database/prisma.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
    ) { }

    async register(dto: RegisterDto): Promise<UserResponseDto> {
        const existing = await this.userRepository.findByEmail(dto.email);

        if (existing) {
            throw new EmailAlreadyRegisteredException();
        }

        const hashedPassword = await this.passwordHasher.hash(dto.password);

        const user = await this.userRepository.create({
            ...dto,
            password: hashedPassword,
        });

        return UserResponseDto.fromEntity(user);
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const isPasswordValid = await this.passwordHasher.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return this.tokenService.generateAuthTokens(user.id, user.email, user.role);
    }

    async refresh(dto: RefreshDto) {
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
