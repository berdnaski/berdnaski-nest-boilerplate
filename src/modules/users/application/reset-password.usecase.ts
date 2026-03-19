import { Injectable, BadRequestException } from '@nestjs/common';
import { IEmailService } from 'src/shared/email/email.service.interface';
import { passwordResetSuccessEmailTemplate } from '../../../shared/email/templates/password-reset-success-email';
import { PasswordHasher } from 'src/shared/security/password-hasher';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '../domain/user.repository';

@Injectable()
export class ResetPasswordUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly emailService: IEmailService,
        private readonly config: ConfigService,
        private readonly passwordHasher: PasswordHasher,
    ) { }

    async execute(token: string, newPassword: string): Promise<void> {
        const resetRecord = await this.userRepository.findByResetToken(token);

        if (!resetRecord || !resetRecord.user) {
            throw new BadRequestException('Token inválido ou expirado');
        }

        const { user } = resetRecord;

        const hashedPassword = await this.passwordHasher.hash(newPassword);
        await this.userRepository.updatePassword(user.id, hashedPassword);

        await this.userRepository.invalidateToken(token);

        const frontendUrl = this.config.get<string>('FRONTEND_URL') || process.env.FRONTEND_URL;
        const loginLink = `${frontendUrl}/login`;

        if (user.email && user.name) {
            const emailHtml = passwordResetSuccessEmailTemplate({
                userName: user.name,
                loginLink,
            });

            await this.emailService.sendEmail({
                to: user.email,
                subject: 'Senha Alterada com Sucesso',
                html: emailHtml,
            });
        }
    }
}
