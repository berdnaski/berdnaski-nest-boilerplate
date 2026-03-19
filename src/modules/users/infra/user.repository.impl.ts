import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { IUserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";
import { RegisterDto } from "src/modules/auth/dto/register.dto";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: RegisterDto): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...data,
            }
        }) as Promise<User>;
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id,
            }
        }) as Promise<User>;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            }
        }) as Promise<User>;
    }
}