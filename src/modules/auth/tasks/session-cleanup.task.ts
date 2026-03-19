import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { QueueName, JobName } from "src/shared/infrastructure/queue/queue.constants";

@Injectable()
export class SessionCleanupTask {
    private readonly logger = new Logger(SessionCleanupTask.name);

    constructor(
        @InjectQueue(QueueName.LONG_RUNNING)
        private readonly queue: Queue
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        this.logger.log('Agendando limpeza de sessões expiradas na fila LONG_RUNNING...');
        await this.queue.add(JobName.CLEANUP_SESSIONS, {});
    }
}