import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { IEmailService, SendEmailPayload } from '../../../email/email.service.interface';
import { QueueName, JobName } from '../queue.constants';
import { IUserRepository, ProcessAvatarPayload } from '../../../../modules/users/domain/user.repository';

@Injectable()
@Processor(QueueName.CORE)
export class CoreProcessor extends WorkerHost {
    private readonly logger = new Logger(CoreProcessor.name);

    constructor(
        private readonly emailService: IEmailService,
        private readonly userRepository: IUserRepository,
    ) {
        super();
    }

    async process(job: Job<SendEmailPayload | ProcessAvatarPayload, any, string>): Promise<any> {
        this.logger.log(`[Queue: ${QueueName.CORE}] Processando Job: ${job.name}`);

        switch (job.name) {
            case JobName.SEND_EMAIL: {
                const data = job.data as SendEmailPayload;
                await this.emailService.sendEmail(data);
                break;
            }

            case JobName.PROCESS_AVATAR: {
                const data = job.data as ProcessAvatarPayload;
                this.logger.log(`Atualizando avatar no banco para usuário: ${data.userId}`);
                
                await this.userRepository.update(data.userId, {
                    avatarUrl: data.avatarUrl
                });
                
                break;
            }

            default:
                this.logger.warn(`Job ${job.name} não possui handler no CoreProcessor`);
        }
    }
}
