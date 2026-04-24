import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleRequestDto } from '../../presentation/dto/requests/create-sale.request';
import { UpdateSaleRequestDto } from '../../presentation/dto/requests/update-sale.request';
import { ISalesRepository } from '../../domain/contracts/interfaces/sales.repository.interface';
import { SaleEntity, SaleStatus } from '../../domain/entities/sale.entity';

@Injectable()
export class SalesRepository implements ISalesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSaleRequestDto): Promise<SaleEntity> {
    const created = await this.prisma.sale.create({
      data: {
        userId: data.userId ?? null,
        clientId: data.clientId ?? null,
        total: new Prisma.Decimal(data.total),
        status: data.status ?? 'DRAFT',
      },
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<SaleEntity[]> {
    const rows = await this.prisma.sale.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  async findById(id: number): Promise<SaleEntity | null> {
    const row = await this.prisma.sale.findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async update(id: number, data: UpdateSaleRequestDto): Promise<SaleEntity> {
    try {
      const row = await this.prisma.sale.update({
        where: { id },
        data: {
          ...(data.userId !== undefined ? { userId: data.userId } : {}),
          ...(data.clientId !== undefined ? { clientId: data.clientId } : {}),
          ...(data.total !== undefined
            ? { total: new Prisma.Decimal(data.total) }
            : {}),
          ...(data.status !== undefined ? { status: data.status } : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
      });
      return this.toEntity(row);
    } catch {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const current = await this.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }
    await this.prisma.sale.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private toEntity(row: {
    id: number;
    userId: number | null;
    clientId: number | null;
    total: Prisma.Decimal;
    status: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): SaleEntity {
    return {
      id: row.id,
      userId: row.userId,
      clientId: row.clientId,
      total: Number(row.total),
      status: row.status as SaleStatus,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
