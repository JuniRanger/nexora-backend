import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precio: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;
}
