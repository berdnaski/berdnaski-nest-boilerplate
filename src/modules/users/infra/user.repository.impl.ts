import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import { IUserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";
import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

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
        return this.prisma.user.findFirst({
            where: { id, deletedAt: null }
        }) as Promise<User>;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { email, deletedAt: null }
        }) as Promise<User>;
    }

    async list(): Promise<User[]> {
        return this.prisma.user.findMany({
            where: { deletedAt: null }
        }) as Promise<User[]>;
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
        }) as Promise<User>;
    }

    async updateAvatar(id: string, avatarUrl: string | null): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: { avatarUrl },
        }) as Promise<User>;
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            }
        });
    }

    async createResetToken(userId: string, token: string, expiresAt: Date): Promise<void> {
        await this.prisma.passwordResetToken.create({
            data: { userId, token, expiresAt },
        });
    }

    async findByResetToken(token: string): Promise<any> {
        return this.prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });
    }

    async updatePassword(userId: string, hashedPassword: string): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }

    async invalidateToken(token: string): Promise<void> {
        await this.prisma.passwordResetToken.delete({
            where: { token },
        });
    }
}