import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { QueueName, JobName } from '../queue.constants';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
@Processor(QueueName.LONG_RUNNING)
export class LongRunningProcessor extends WorkerHost {
    private readonly logger = new Logger(LongRunningProcessor.name);

    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async process(job: Job<unknown, any, string>): Promise<any> {
        this.logger.log(`[Queue: ${QueueName.LONG_RUNNING}] Iniciando tarefa: ${job.name}`);

        switch (job.name) {
            case JobName.CLEANUP_SESSIONS:
                const result = await this.prisma.refreshToken.deleteMany({
                    where: { expiresAt: { lt: new Date() } }
                });
                if (result.count > 0) {
                    this.logger.log(`Sessões expiradas removidas via fila: ${result.count}`);
                }
                break;
        }
    }
}
