import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { User } from "./user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

export abstract class IUserRepository {
    abstract create(data: RegisterDto): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract list(): Promise<User[]>;
    abstract update(id: string, data: UpdateUserDto): Promise<User>;
    abstract updateAvatar(id: string, avatarUrl: string | null): Promise<User>;
    abstract delete(id: string): Promise<void>;

    abstract createResetToken(userId: string, token: string, expiresAt: Date): Promise<void>;
    abstract findByResetToken(token: string): Promise<any>;
    abstract updatePassword(userId: string, hashedPassword: string): Promise<void>;
    abstract invalidateToken(token: string): Promise<void>;
}