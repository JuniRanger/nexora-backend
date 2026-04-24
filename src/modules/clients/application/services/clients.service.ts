import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientRequestDto } from '../../presentation/dto/requests/create-client.request';
import { UpdateClientRequestDto } from '../../presentation/dto/requests/update-client.request';
import { ClientResponseDto } from '../../presentation/dto/responses/client.response';
import { IClientsService } from '../../domain/contracts/interfaces/clients.service.interface';
import { IClientsRepository } from '../../domain/contracts/interfaces/clients.repository.interface';
import { CLIENTS_REPOSITORY_TOKEN } from '../../clients.tokens';

@Injectable()
export class ClientsService implements IClientsService {
  constructor(
    @Inject(CLIENTS_REPOSITORY_TOKEN)
    private readonly clientsRepository: IClientsRepository,
  ) {}

  create(dto: CreateClientRequestDto): Promise<ClientResponseDto> {
    return this.clientsRepository.create(dto);
  }

  findAll(): Promise<ClientResponseDto[]> {
    return this.clientsRepository.findAll();
  }

  async findOne(id: number): Promise<ClientResponseDto> {
    const client = await this.clientsRepository.findById(id);
    if (!client || !client.isActive) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  update(id: number, dto: UpdateClientRequestDto): Promise<ClientResponseDto> {
    return this.clientsRepository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.clientsRepository.softDelete(id);
  }
}
