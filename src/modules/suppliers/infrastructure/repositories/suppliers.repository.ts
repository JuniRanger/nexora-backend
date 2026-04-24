import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierRequestDto } from '../../presentation/dto/requests/create-supplier.request';
import { UpdateSupplierRequestDto } from '../../presentation/dto/requests/update-supplier.request';
import { ISuppliersRepository } from '../../domain/contracts/interfaces/suppliers.repository.interface';
import { SupplierEntity } from '../../domain/entities/supplier.entity';

@Injectable()
export class SuppliersRepository implements ISuppliersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSupplierRequestDto): Promise<SupplierEntity> {
    return this.prisma.supplier.create({
      data: {
        nombre: data.nombre,
        telefono: data.telefono ?? null,
        email: data.email ?? null,
      },
    });
  }

  findAll(): Promise<SupplierEntity[]> {
    return this.prisma.supplier.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number): Promise<SupplierEntity | null> {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSupplierRequestDto): Promise<SupplierEntity> {
    try {
      return await this.prisma.supplier.update({
        where: { id },
        data: {
          ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
          ...(data.telefono !== undefined ? { telefono: data.telefono } : {}),
          ...(data.email !== undefined ? { email: data.email } : {}),
        },
      });
    } catch {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const current = await this.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    await this.prisma.supplier.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
