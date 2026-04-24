export type AccountingEntryType = 'INCOME' | 'EXPENSE';

export interface AccountingEntryEntity {
  id: number;
  tipo: AccountingEntryType;
  monto: number;
  descripcion: string;
  saleId: number | null;
  purchaseId: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
