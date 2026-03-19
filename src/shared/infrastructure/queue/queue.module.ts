import { Global, Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { QueueName } from './queue.constants';
import { CoreProcessor } from './processors/core.processor';
import { LongRunningProcessor } from './processors/long-running.processor';
import { DatabaseModule } from '../../database/database.module';
import { EmailModule } from '../../email/email.module';
import { UsersModule } from '../../../modules/users/users.module';

@Global()
@Module({
    imports: [
        DatabaseModule,
        EmailModule,
        forwardRef(() => UsersModule),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                connection: {
                    host: config.getOrThrow<string>('REDIS_HOST'),
                    port: config.getOrThrow<number>('REDIS_PORT'),
                    password: config.get<string>('REDIS_PASSWORD') || undefined,
                },
            }),
        }),
        BullBoardModule.forRoot({
            route: '/admin/queues',
            adapter: ExpressAdapter,
        }),
        BullModule.registerQueue(
            {
                name: QueueName.CORE,
                defaultJobOptions: {
                    attempts: 5,
                    backoff: { type: 'exponential', delay: 2000 },
                    removeOnComplete: { count: 50 },
                    removeOnFail: { count: 100 },
                },
            },
            {
                name: QueueName.LONG_RUNNING,
                defaultJobOptions: {
                    attempts: 1,
                    backoff: { type: 'fixed', delay: 5000 },
                    removeOnComplete: { count: 100 },
                    removeOnFail: { count: 500 },
                },
            },
        ),
        BullBoardModule.forFeature(
            { name: QueueName.CORE, adapter: BullMQAdapter },
            { name: QueueName.LONG_RUNNING, adapter: BullMQAdapter },
        ),
    ],
    providers: [CoreProcessor, LongRunningProcessor],
    exports: [BullModule, BullBoardModule],
})
export class QueueModule { }
