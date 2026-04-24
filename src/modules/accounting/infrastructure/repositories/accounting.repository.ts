import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountingEntryRequestDto } from '../../presentation/dto/requests/create-accounting-entry.request';
import { UpdateAccountingEntryRequestDto } from '../../presentation/dto/requests/update-accounting-entry.request';
import { IAccountingRepository } from '../../domain/contracts/interfaces/accounting.repository.interface';
import {
  AccountingEntryEntity,
  AccountingEntryType,
} from '../../domain/entities/accounting-entry.entity';

@Injectable()
export class AccountingRepository implements IAccountingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccountingEntryRequestDto): Promise<AccountingEntryEntity> {
    const row = await this.prisma.accountingEntry.create({
      data: {
        tipo: data.tipo,
        monto: new Prisma.Decimal(data.monto),
        descripcion: data.descripcion,
        saleId: data.saleId ?? null,
        purchaseId: data.purchaseId ?? null,
      },
    });
    return this.toEntity(row);
  }

  async findAll(): Promise<AccountingEntryEntity[]> {
    const rows = await this.prisma.accountingEntry.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  async findById(id: number): Promise<AccountingEntryEntity | null> {
    const row = await this.prisma.accountingEntry.findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async update(
    id: number,
    data: UpdateAccountingEntryRequestDto,
  ): Promise<AccountingEntryEntity> {
    try {
      const row = await this.prisma.accountingEntry.update({
        where: { id },
        data: {
          ...(data.tipo !== undefined ? { tipo: data.tipo } : {}),
          ...(data.monto !== undefined
            ? { monto: new Prisma.Decimal(data.monto) }
            : {}),
          ...(data.descripcion !== undefined
            ? { descripcion: data.descripcion }
            : {}),
          ...(data.saleId !== undefined ? { saleId: data.saleId } : {}),
          ...(data.purchaseId !== undefined ? { purchaseId: data.purchaseId } : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
      });
      return this.toEntity(row);
    } catch {
      throw new NotFoundException(`Accounting entry with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const current = await this.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`Accounting entry with id ${id} not found`);
    }
    await this.prisma.accountingEntry.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private toEntity(row: {
    id: number;
    tipo: string;
    monto: Prisma.Decimal;
    descripcion: string;
    saleId: number | null;
    purchaseId: number | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): AccountingEntryEntity {
    return {
      id: row.id,
      tipo: row.tipo as AccountingEntryType,
      monto: Number(row.monto),
      descripcion: row.descripcion,
      saleId: row.saleId,
      purchaseId: row.purchaseId,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
