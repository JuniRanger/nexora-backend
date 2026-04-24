/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from '../../domain/contracts/inputs/create-user.input';
import { UpdateUserInput } from '../../domain/contracts/inputs/update-user.input';
import { IUsersRepository } from '../../domain/contracts/interfaces/users.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: UserMapper.toCreate(data) as any,
    });
    return UserMapper.toDomain(created);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { isActive: true } as any,
      orderBy: { id: 'desc' },
    });
    return users.map((user) => UserMapper.toDomain(user));
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(id: number, data: UpdateUserInput): Promise<UserEntity> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: UserMapper.toUpdate(data) as any,
      });
      return UserMapper.toDomain(updated);
    } catch {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user || !user.isActive) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false } as any,
    });
  }
}
