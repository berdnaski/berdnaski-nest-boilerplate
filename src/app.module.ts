import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StorageModule } from './shared/infrastructure/services/storage.module';
import { QueueModule } from './shared/infrastructure/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    StorageModule,
    QueueModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule { }
