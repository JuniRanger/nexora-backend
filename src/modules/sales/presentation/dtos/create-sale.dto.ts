import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  productId: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  cantidad: number;
}
