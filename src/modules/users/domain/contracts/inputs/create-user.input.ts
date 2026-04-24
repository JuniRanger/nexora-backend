import { UserRole } from '../../entities/user.entity';

export interface CreateUserInput {
  email: string;
  password: string;
  role?: UserRole;
}
