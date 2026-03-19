export abstract class IEmailService {
  abstract sendEmail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void>;
}
