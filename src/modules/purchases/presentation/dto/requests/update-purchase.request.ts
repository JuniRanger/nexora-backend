import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { PurchaseStatus } from '../../../domain/entities/purchase.entity';

export class UpdatePurchaseRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  supplierId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  total?: number;

  @IsOptional()
  @IsEnum(['PENDING', 'RECEIVED', 'CANCELLED'])
  status?: PurchaseStatus;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
