import { Body, Controller, Delete, Get, Param, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ListUsersUseCase } from './application/list-users.usecase';
import { FindByUserUseCase } from './application/find-by-user.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { DeleteUserUseCase } from './application/delete-user.usecase';
import { UpdateUserAvatarUseCase } from './application/update-user-avatar.usecase';
import { UpdateUserDto } from './dto/update-user.dto';
import { OwnerOrAdminGuard } from 'src/shared/decorators/owner-or-admin.guard';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly findByUserUseCase: FindByUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserAvatarUseCase: UpdateUserAvatarUseCase,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Listagem de usuários' })
  @ApiResponse({ status: 200, description: 'Listagem de usuários realizada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async list(): Promise<UserResponseDto[]> {
    const users = await this.listUsersUseCase.execute();
    return users.map(user => UserResponseDto.fromEntity(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca de usuário por ID' })
  @ApiResponse({ status: 200, description: 'Busca de usuário realizada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.findByUserUseCase.execute(id);
    return UserResponseDto.fromEntity(user);
  }

  @Put(':id')
  @UseGuards(OwnerOrAdminGuard)
  @ApiOperation({ summary: 'Atualização de usuário' })
  @ApiResponse({ status: 200, description: 'Atualização de usuário realizada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.updateUserUseCase.execute(id, data);
    return UserResponseDto.fromEntity(user);
  }

  @Delete(':id')
  @UseGuards(OwnerOrAdminGuard)
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Deletar usuário realizada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async delete(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }

  @Put(':id/avatar')
  @UseGuards(OwnerOrAdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Atualizar foto de perfil (avatar)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<UserResponseDto> {
    const user = await this.updateUserAvatarUseCase.execute(id, file);
    return UserResponseDto.fromEntity(user);
  }
}
