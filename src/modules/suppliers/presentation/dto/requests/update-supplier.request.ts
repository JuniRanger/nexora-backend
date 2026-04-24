import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateSupplierRequestDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombre?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
