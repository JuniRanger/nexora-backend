import { UserRole } from '../../entities/user.entity';

export interface UpdateUserInput {
  email?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}
