import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../inputs/create-user.input';
import { UpdateUserInput } from '../inputs/update-user.input';

export interface IUsersRepository {
  create(data: CreateUserInput): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: number, data: UpdateUserInput): Promise<UserEntity>;
  softDelete(id: number): Promise<void>;
}
