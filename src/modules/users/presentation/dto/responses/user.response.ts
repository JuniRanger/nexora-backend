import { UserRole } from '../../../domain/entities/user.entity';

export class UserResponseDto {
  id!: number;
  email!: string;
  passwordHash!: string;
  role!: UserRole;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
