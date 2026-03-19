import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { SessionCleanupTask } from './tasks/session-cleanup.task';
import { AuthJwtModule } from './jwt/auth-jwt.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SecurityModule } from 'src/shared/security/security.module';
import { RegisterUseCase } from './application/register.usecase';
import { LoginUseCase } from './application/login.usecase';
import { RefreshUseCase } from './application/refresh.usecase';

@Module({
    imports: [
        AuthJwtModule,
        UsersModule,
        SecurityModule,
    ],
    controllers: [AuthController],
    providers: [
        RegisterUseCase, 
        LoginUseCase, 
        RefreshUseCase, 
        TokenService, 
        SessionCleanupTask
    ],
})
export class AuthModule { }
