export type PurchaseStatus = 'PENDING' | 'RECEIVED' | 'CANCELLED';

export interface PurchaseEntity {
  id: number;
  supplierId: number | null;
  total: number;
  status: PurchaseStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
