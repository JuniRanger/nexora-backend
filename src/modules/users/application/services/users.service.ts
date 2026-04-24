import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from '../../presentation/dto/requests/create-user.request';
import { UpdateUserRequestDto } from '../../presentation/dto/requests/update-user.request';
import { UserResponseDto } from '../../presentation/dto/responses/user.response';
import { IUsersService } from '../../domain/contracts/interfaces/users.service.interface';
import { IUsersRepository } from '../../domain/contracts/interfaces/users.repository.interface';
import { USERS_REPOSITORY_TOKEN } from '../../users.tokens';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    const exists = await this.usersRepository.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Email already in use');
    }
    const created = await this.usersRepository.create(dto);
    return UserMapper.toResponse(created);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => UserMapper.toResponse(user));
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user || !user.isActive) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return UserMapper.toResponse(user);
  }

  findByEmail(email: string): Promise<UserResponseDto> {
    return this.findOneByEmail(email);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user || !user.isActive) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return UserMapper.toResponse(user);
  }

  async update(
    id: number,
    dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const current = await this.usersRepository.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (dto.email && dto.email !== current.email) {
      const emailInUse = await this.usersRepository.findByEmail(dto.email);
      if (emailInUse && emailInUse.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }
    const updated = await this.usersRepository.update(id, dto);
    return UserMapper.toResponse(updated);
  }

  remove(id: number): Promise<void> {
    return this.usersRepository.softDelete(id);
  }
}
