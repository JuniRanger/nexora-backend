import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? this.toDomain(row) : null;
  }

  async create(data: { email: string; passwordHash: string }): Promise<User> {
    const row = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.passwordHash,
      },
    });
    return this.toDomain(row);
  }

  private toDomain(row: {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
  }): User {
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      createdAt: row.createdAt,
    };
  }
}
