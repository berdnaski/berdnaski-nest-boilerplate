import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RegisterUseCase } from './application/register.usecase';
import { LoginUseCase } from './application/login.usecase';
import { RefreshUseCase } from './application/refresh.usecase';
import { ForgotPasswordUseCase } from '../users/application/forgot-password.usecase';
import { ResetPasswordUseCase } from '../users/application/reset-password.usecase';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly refreshUseCase: RefreshUseCase,
        private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'E-mail já cadastrado' })
    register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
        return this.registerUseCase.execute(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fazer login' })
    login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Renovar access token' })
    refresh(@Body() dto: RefreshDto) {
        return this.refreshUseCase.execute(dto);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Solicitar link de recuperação de senha' })
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        await this.forgotPasswordUseCase.execute(dto.email);
        return { message: 'Se o e-mail existir, um link de recuperação foi enviado.' };
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Redefinir senha usando token' })
    async resetPassword(@Body() dto: ResetPasswordDto) {
        await this.resetPasswordUseCase.execute(dto.token, dto.password);
        return { message: 'Senha redefinida com sucesso.' };
    }
}
