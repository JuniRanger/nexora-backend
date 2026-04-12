export type AccountingEntryType = 'INCOME' | 'EXPENSE';

export interface AccountingEntry {
  id: number;
  tipo: AccountingEntryType;
  monto: number;
  descripcion: string;
  referenciaId: number | null;
  createdAt: Date;
}
