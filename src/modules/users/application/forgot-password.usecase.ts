import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import * as crypto from 'crypto';
import { IUserRepository } from '../domain/user.repository';
import { forgotPasswordEmailTemplate } from '../../../shared/email/templates/forgot-password-email';
import { QueueName, JobName } from 'src/shared/infrastructure/queue/queue.constants';
import { SendEmailPayload } from 'src/shared/email/email.service.interface';

@Injectable()
export class ForgotPasswordUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly config: ConfigService,
        @InjectQueue(QueueName.CORE)
        private readonly emailQueue: Queue<SendEmailPayload>,
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return;

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();

        expiresAt.setHours(expiresAt.getHours() + 2);

        await this.userRepository.createResetToken(user.id, token, expiresAt);

        const frontendUrl = this.config.getOrThrow<string>('FRONTEND_URL');
        const resetLink = `${frontendUrl}/reset-password?token=${token}`;

        const emailHtml = forgotPasswordEmailTemplate({
            userName: user.name,
            resetLink,
        });

        await this.emailQueue.add(JobName.SEND_EMAIL, {
            to: user.email,
            subject: 'Recuperação de Senha',
            html: emailHtml,
        });
    }
}
