import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards()
@Controller('users')
export class UsersController {
  constructor(
  ) { }
}
