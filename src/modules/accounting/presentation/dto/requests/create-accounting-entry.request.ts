import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AccountingEntryType } from '../../../domain/entities/accounting-entry.entity';

export class CreateAccountingEntryRequestDto {
  @IsEnum(['INCOME', 'EXPENSE'])
  tipo!: AccountingEntryType;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  monto!: number;

  @IsString()
  descripcion!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  saleId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  purchaseId?: number;
}
