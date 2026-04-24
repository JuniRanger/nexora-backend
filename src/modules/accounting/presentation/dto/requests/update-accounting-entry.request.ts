import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AccountingEntryType } from '../../../domain/entities/accounting-entry.entity';

export class UpdateAccountingEntryRequestDto {
  @IsOptional()
  @IsEnum(['INCOME', 'EXPENSE'])
  tipo?: AccountingEntryType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  monto?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  saleId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  purchaseId?: number | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
