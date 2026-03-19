import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class SessionCleanupTask {
    private readonly logger = new Logger(SessionCleanupTask.name);

    constructor(private readonly prisma: PrismaService) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        this.logger.log('Iniciando limpeza de sessões expiradas...');

        try {
            const result = await this.prisma.refreshToken.deleteMany({
                where: {
                    expiresAt: {
                        lt: new Date(),
                    },
                },
            });

            if (result.count > 0) {
                this.logger.log(`Sessões expiradas removidas: ${result.count}`);
            }
        } catch (error) {
            this.logger.error('Erro ao limpar sessões expiradas:', error);
        }
    }
}