import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;
}