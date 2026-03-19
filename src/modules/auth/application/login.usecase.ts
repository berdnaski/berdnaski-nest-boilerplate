import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { IUserRepository } from "src/modules/users/domain/user.repository";
import { PasswordHasher } from "src/shared/security/password-hasher";
import { TokenService } from "../token.service";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly tokenService: TokenService,
    ) { }

    async execute(dto: LoginDto) {
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
}
