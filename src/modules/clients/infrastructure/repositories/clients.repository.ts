import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientRequestDto } from '../../presentation/dto/requests/create-client.request';
import { UpdateClientRequestDto } from '../../presentation/dto/requests/update-client.request';
import { IClientsRepository } from '../../domain/contracts/interfaces/clients.repository.interface';
import { ClientEntity } from '../../domain/entities/client.entity';

@Injectable()
export class ClientsRepository implements IClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClientRequestDto): Promise<ClientEntity> {
    const created = await this.prisma.client.create({
      data: {
        nombre: data.nombre,
        telefono: data.telefono ?? null,
        email: data.email ?? null,
        direccion: data.direccion ?? null,
      },
    });
    return created;
  }

  findAll(): Promise<ClientEntity[]> {
    return this.prisma.client.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number): Promise<ClientEntity | null> {
    return this.prisma.client.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateClientRequestDto): Promise<ClientEntity> {
    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
          ...(data.telefono !== undefined ? { telefono: data.telefono } : {}),
          ...(data.email !== undefined ? { email: data.email } : {}),
          ...(data.direccion !== undefined ? { direccion: data.direccion } : {}),
        },
      });
    } catch {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const current = await this.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    await this.prisma.client.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
