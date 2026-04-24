import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductRequestDto {
  @IsString()
  @MinLength(1)
  nombre!: string;

  @IsString()
  @MinLength(1)
  sku!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precio!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costo!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock!: number;
}
