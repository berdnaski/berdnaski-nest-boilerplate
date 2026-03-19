import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({ description: 'Nova senha com mínimo de 6 caracteres' })
    @IsString()
    @MinLength(6)
    password: string;
}
