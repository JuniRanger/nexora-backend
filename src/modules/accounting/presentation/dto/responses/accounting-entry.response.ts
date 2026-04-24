import { AccountingEntryType } from '../../../domain/entities/accounting-entry.entity';

export class AccountingEntryResponseDto {
  id!: number;
  tipo!: AccountingEntryType;
  monto!: number;
  descripcion!: string;
  saleId!: number | null;
  purchaseId!: number | null;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
