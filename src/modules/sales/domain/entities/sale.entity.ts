export type SaleStatus = 'DRAFT' | 'COMPLETED' | 'CANCELLED';

export interface SaleEntity {
  id: number;
  userId: number | null;
  clientId: number | null;
  total: number;
  status: SaleStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
