import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'E-mail já cadastrado' })
    register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
        return this.authService.register(dto);
    }
}
