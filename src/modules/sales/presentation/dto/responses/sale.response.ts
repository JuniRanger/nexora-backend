import { SaleStatus } from '../../../domain/entities/sale.entity';

export class SaleResponseDto {
  id!: number;
  userId!: number | null;
  clientId!: number | null;
  total!: number;
  status!: SaleStatus;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
