import { Global, Module } from '@nestjs/common';
import { PasswordHasher } from './password-hasher';

@Global()
@Module({
    providers: [PasswordHasher],
    exports: [PasswordHasher],
})
export class SecurityModule { }
