import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { SaleStatus } from '../../../domain/entities/sale.entity';

export class CreateSaleRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  clientId?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  total!: number;

  @IsOptional()
  @IsEnum(['DRAFT', 'COMPLETED', 'CANCELLED'])
  status?: SaleStatus;
}
