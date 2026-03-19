import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { User } from "./user.entity";

export abstract class IUserRepository {
    abstract create(data: RegisterDto): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
}