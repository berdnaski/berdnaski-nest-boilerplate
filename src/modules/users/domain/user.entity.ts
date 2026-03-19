import { UserRole } from "src/shared/types/role.enum";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

