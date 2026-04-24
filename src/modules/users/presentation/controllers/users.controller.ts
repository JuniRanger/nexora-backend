import {
  Body,
  Controller,
  Delete,
  Inject,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/requests/create-user.request';
import { UpdateUserRequestDto } from '../dto/requests/update-user.request';
import { UserResponseDto } from '../dto/responses/user.response';
import { IUsersService } from '../../domain/contracts/interfaces/users.service.interface';
import { USERS_SERVICE_TOKEN } from '../../users.tokens';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: IUsersService,
  ) {}

  @Post()
  create(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User soft deleted successfully' };
  }
}
