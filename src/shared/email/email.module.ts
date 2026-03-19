import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResendEmailService } from './resend-email.service';
import { IEmailService } from './email.service.interface';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: IEmailService, useClass: ResendEmailService }],
  exports: [IEmailService],
})
export class EmailModule {}
