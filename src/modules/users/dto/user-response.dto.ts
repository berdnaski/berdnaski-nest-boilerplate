import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/shared/types/role.enum";
import { User } from "../domain/user.entity";

export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: UserRole;

    @ApiProperty({ required: false, nullable: true })
    avatarUrl: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    static fromEntity(user: User): UserResponseDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl || null,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}