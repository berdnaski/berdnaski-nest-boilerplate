import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../types/role.enum';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const targetId = request.params.id;

        if (!user) return false;

        if (user.role === UserRole.ADMIN) {
            return true;
        }

        return user.userId === targetId;
    }
}
