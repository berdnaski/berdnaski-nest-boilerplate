import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'joao@exemplo.com', description: 'E-mail do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;
}
