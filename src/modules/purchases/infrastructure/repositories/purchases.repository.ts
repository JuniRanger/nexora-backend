import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseRequestDto } from '../../presentation/dto/requests/create-purchase.request';
import { UpdatePurchaseRequestDto } from '../../presentation/dto/requests/update-purchase.request';
import { IPurchasesRepository } from '../../domain/contracts/interfaces/purchases.repository.interface';
import {
  PurchaseEntity,
  PurchaseStatus,
} from '../../domain/entities/purchase.entity';

@Injectable()
export class PurchasesRepository implements IPurchasesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePurchaseRequestDto): Promise<PurchaseEntity> {
    const row = await this.prisma.purchase.create({
      data: {
        supplierId: data.supplierId ?? null,
        total: new Prisma.Decimal(data.total),
        status: data.status ?? 'PENDING',
      },
    });
    return this.toEntity(row);
  }

  async findAll(): Promise<PurchaseEntity[]> {
    const rows = await this.prisma.purchase.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  async findById(id: number): Promise<PurchaseEntity | null> {
    const row = await this.prisma.purchase.findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async update(id: number, data: UpdatePurchaseRequestDto): Promise<PurchaseEntity> {
    try {
      const row = await this.prisma.purchase.update({
        where: { id },
        data: {
          ...(data.supplierId !== undefined ? { supplierId: data.supplierId } : {}),
          ...(data.total !== undefined
            ? { total: new Prisma.Decimal(data.total) }
            : {}),
          ...(data.status !== undefined ? { status: data.status } : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
      });
      return this.toEntity(row);
    } catch {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const current = await this.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`Purchase with id ${id} not found`);
    }
    await this.prisma.purchase.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private toEntity(row: {
    id: number;
    supplierId: number | null;
    total: Prisma.Decimal;
    status: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): PurchaseEntity {
    return {
      id: row.id,
      supplierId: row.supplierId,
      total: Number(row.total),
      status: row.status as PurchaseStatus,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
