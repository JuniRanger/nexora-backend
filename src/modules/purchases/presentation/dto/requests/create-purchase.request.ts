import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { PurchaseStatus } from '../../../domain/entities/purchase.entity';

export class CreatePurchaseRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  supplierId?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  total!: number;

  @IsOptional()
  @IsEnum(['PENDING', 'RECEIVED', 'CANCELLED'])
  status?: PurchaseStatus;
}
