import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type {
  AccountingEntry,
  AccountingEntryType,
} from '../../domain/entities/accounting-entry.entity';
import type { IAccountingRepository } from '../../domain/repositories/accounting.repository.interface';

type AccountingEntryRow = {
  id: number;
  tipo: string;
  monto: number;
  descripcion: string;
  referenciaId: number | null;
  createdAt: Date;
};

/** Prisma generated client is `@ts-nocheck`; narrow the delegate so callers stay type-safe for ESLint. */
type AccountingEntryDelegate = {
  create(args: {
    data: {
      tipo: AccountingEntryType;
      monto: number;
      descripcion: string;
    };
  }): Promise<AccountingEntryRow>;
};

function accountingEntry(prisma: PrismaService): AccountingEntryDelegate {
  return (prisma as unknown as { accountingEntry: AccountingEntryDelegate })
    .accountingEntry;
}

@Injectable()
export class AccountingRepository implements IAccountingRepository {
  constructor(private readonly prisma: PrismaService) {}

  createIncome(data: {
    monto: number;
    descripcion: string;
  }): Promise<AccountingEntry> {
    return this.create('INCOME', data);
  }

  createExpense(data: {
    monto: number;
    descripcion: string;
  }): Promise<AccountingEntry> {
    return this.create('EXPENSE', data);
  }

  private async create(
    tipo: AccountingEntryType,
    data: { monto: number; descripcion: string },
  ): Promise<AccountingEntry> {
    const row = await accountingEntry(this.prisma).create({
      data: {
        tipo,
        monto: data.monto,
        descripcion: data.descripcion,
      },
    });
    return this.toDomain(row);
  }

  private toDomain(row: AccountingEntryRow): AccountingEntry {
    return {
      id: row.id,
      tipo: row.tipo as AccountingEntryType,
      monto: row.monto,
      descripcion: row.descripcion,
      referenciaId: row.referenciaId,
      createdAt: row.createdAt,
    };
  }
}
