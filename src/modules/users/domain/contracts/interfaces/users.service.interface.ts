import { CreateUserRequestDto } from '../../../presentation/dto/requests/create-user.request';
import { UpdateUserRequestDto } from '../../../presentation/dto/requests/update-user.request';
import { UserResponseDto } from '../../../presentation/dto/responses/user.response';

export interface IUsersService {
  create(dto: CreateUserRequestDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findByEmail(email: string): Promise<UserResponseDto>;
  findOneByEmail(email: string): Promise<UserResponseDto>;
  findOne(id: number): Promise<UserResponseDto>;
  update(id: number, dto: UpdateUserRequestDto): Promise<UserResponseDto>;
  remove(id: number): Promise<void>;
}
