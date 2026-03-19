import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../types/role.enum';

export interface AuthUserPayload {
    userId: string;
    email: string;
    role: UserRole;
}

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthUserPayload => {
        const request = ctx.switchToHttp().getRequest<Request & { user: AuthUserPayload }>();
        return request.user;
    },
);
