import { CreateUserInput } from '../../domain/contracts/inputs/create-user.input';
import { UpdateUserInput } from '../../domain/contracts/inputs/update-user.input';
import { UserEntity, UserRole } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../../presentation/dto/responses/user.response';

export class UserMapper {
  static toDomain(raw: any): UserEntity {
    return {
      id: raw.id,
      email: raw.email,
      password: raw.password,
      role: raw.role as UserRole,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toCreate(data: CreateUserInput) {
    return {
      email: data.email,
      password: data.password,
      role: data.role ?? 'SELLER',
      isActive: true,
    };
  }

  static toUpdate(data: UpdateUserInput) {
    const payload: Record<string, unknown> = {};
    if (data.email !== undefined) payload.email = data.email;
    if (data.password !== undefined) payload.password = data.password;
    if (data.role !== undefined) payload.role = data.role;
    if (data.isActive !== undefined) payload.isActive = data.isActive;
    return payload;
  }

  static toResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.password,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
