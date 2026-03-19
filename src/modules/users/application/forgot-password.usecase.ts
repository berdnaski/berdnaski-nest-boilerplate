import { Injectable } from '@nestjs/common';
import { IEmailService } from 'src/shared/email/email.service.interface';
import { forgotPasswordEmailTemplate } from '../../../shared/email/templates/forgot-password-email';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '../domain/user.repository';

@Injectable()
export class ForgotPasswordUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly emailService: IEmailService,
        private readonly config: ConfigService,
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return;

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 2);

        await this.userRepository.createResetToken(user.id, token, expiresAt);

        const frontendUrl = this.config.get<string>('FRONTEND_URL') || process.env.FRONTEND_URL;
        const resetLink = `${frontendUrl}/reset-password?token=${token}`;

        const emailHtml = forgotPasswordEmailTemplate({
            userName: user.name,
            resetLink,
        });

        await this.emailService.sendEmail({
            to: user.email,
            subject: 'Recuperação de Senha',
            html: emailHtml,
        });
    }
}
