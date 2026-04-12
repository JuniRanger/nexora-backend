import type { AccountingEntry } from '../entities/accounting-entry.entity';

export interface IAccountingRepository {
  createIncome(data: {
    monto: number;
    descripcion: string;
  }): Promise<AccountingEntry>;
  createExpense(data: {
    monto: number;
    descripcion: string;
  }): Promise<AccountingEntry>;
}
