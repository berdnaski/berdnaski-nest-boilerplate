import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { EmailAlreadyRegisteredException } from 'src/shared/exceptions/email-already-registered.exception';
import { IUserRepository } from '../users/domain/user.repository';
import { PasswordHasher } from 'src/shared/security/password-hasher';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly jwtService: JwtService,
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
}
