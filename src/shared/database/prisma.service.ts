import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    private readonly pool: Pool;

    constructor(configService: ConfigService) {
        const pool = new Pool({
            connectionString: configService.get<string>('DATABASE_URL'),
        });

        const adapter = new PrismaPg(pool as any);

        super({
            adapter,
            log: ['error', 'warn'],
        });

        this.pool = pool;
    }

    async onModuleInit() {
        await this.$connect();
        console.log('✅ Prisma connected to PostgreSQL');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        await this.pool.end();
        console.log('🔌 Prisma disconnected from PostgreSQL');
    }
}
