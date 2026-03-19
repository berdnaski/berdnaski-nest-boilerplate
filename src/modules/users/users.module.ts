import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IUserRepository } from './domain/user.repository';
import { UserRepositoryImpl } from './infra/user.repository.impl';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: IUserRepository, useClass: UserRepositoryImpl },
  ],
  exports: [
    IUserRepository
  ]
})
export class UsersModule { }
