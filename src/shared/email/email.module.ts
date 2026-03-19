import { Module } from '@nestjs/common';
import { ResendEmailService } from './resend-email.service';
import { IEmailService } from './email.service.interface';

@Module({
  imports: [],
  providers: [
    { provide: IEmailService, useClass: ResendEmailService },
  ],
  exports: [IEmailService],
})
export class EmailModule { }
