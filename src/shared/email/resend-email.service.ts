import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { IEmailService } from './email.service.interface';

@Injectable()
export class ResendEmailService implements IEmailService {
  private readonly resend: Resend;

  constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    if (!apiKey) throw new Error('RESEND_API_KEY não configurada');
    this.resend = new Resend(apiKey);
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [params.to],
      subject: params.subject,
      html: params.html,
    });
  }
}
