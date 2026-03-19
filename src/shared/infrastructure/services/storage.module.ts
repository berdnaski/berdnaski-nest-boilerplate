import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from '../../domain/services/storage.service';
import { CloudflareStorageService } from './cloudflare-storage.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: StorageService,
            useClass: CloudflareStorageService,
        },
    ],
    exports: [StorageService],
})
export class StorageModule {}
