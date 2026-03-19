import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IUserRepository } from './domain/user.repository';
import { UserRepositoryImpl } from './infra/user.repository.impl';
import { ListUsersUseCase } from './application/list-users.usecase';
import { FindByUserUseCase } from './application/find-by-user.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { DeleteUserUseCase } from './application/delete-user.usecase';
import { ForgotPasswordUseCase } from './application/forgot-password.usecase';
import { ResetPasswordUseCase } from './application/reset-password.usecase';
import { UpdateUserAvatarUseCase } from './application/update-user-avatar.usecase';
import { EmailModule } from 'src/shared/email/email.module';
import { SecurityModule } from 'src/shared/security/security.module';

@Module({
  imports: [EmailModule, SecurityModule],
  controllers: [UsersController],
  providers: [
    { provide: IUserRepository, useClass: UserRepositoryImpl },
    ListUsersUseCase,
    FindByUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    UpdateUserAvatarUseCase,
  ],
  exports: [
    IUserRepository,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
  ]
})
export class UsersModule { }
