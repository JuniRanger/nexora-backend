export type UserRole = 'ADMIN' | 'MANAGER' | 'SELLER';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
