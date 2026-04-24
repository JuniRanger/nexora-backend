import { ClientEntity } from '../../entities/client.entity';
import { CreateClientRequestDto } from '../../../presentation/dto/requests/create-client.request';
import { UpdateClientRequestDto } from '../../../presentation/dto/requests/update-client.request';

export interface IClientsRepository {
  create(data: CreateClientRequestDto): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findById(id: number): Promise<ClientEntity | null>;
  update(id: number, data: UpdateClientRequestDto): Promise<ClientEntity>;
  softDelete(id: number): Promise<void>;
}
