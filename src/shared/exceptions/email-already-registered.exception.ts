import { ConflictException } from '@nestjs/common';

export class EmailAlreadyRegisteredException extends ConflictException {
    constructor() {
        super('Email already registered');
    }
}
