import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { SaleStatus } from '../../../domain/entities/sale.entity';

export class UpdateSaleRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  clientId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  total?: number;

  @IsOptional()
  @IsEnum(['DRAFT', 'COMPLETED', 'CANCELLED'])
  status?: SaleStatus;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
