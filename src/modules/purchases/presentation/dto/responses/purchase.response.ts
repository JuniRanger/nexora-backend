import { PurchaseStatus } from '../../../domain/entities/purchase.entity';

export class PurchaseResponseDto {
  id!: number;
  supplierId!: number | null;
  total!: number;
  status!: PurchaseStatus;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
