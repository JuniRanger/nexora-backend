import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateAccountingEntryDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  monto: number;

  @IsString()
  @MinLength(1)
  descripcion: string;
}
