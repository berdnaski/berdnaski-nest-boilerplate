import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtModule } from './jwt/auth-jwt.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SecurityModule } from 'src/shared/security/security.module';

@Module({
    imports: [
        AuthJwtModule,
        UsersModule,
        SecurityModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
