import { CreateClientRequestDto } from '../../../presentation/dto/requests/create-client.request';
import { UpdateClientRequestDto } from '../../../presentation/dto/requests/update-client.request';
import { ClientResponseDto } from '../../../presentation/dto/responses/client.response';

export interface IClientsService {
  create(dto: CreateClientRequestDto): Promise<ClientResponseDto>;
  findAll(): Promise<ClientResponseDto[]>;
  findOne(id: number): Promise<ClientResponseDto>;
  update(id: number, dto: UpdateClientRequestDto): Promise<ClientResponseDto>;
  remove(id: number): Promise<void>;
}
