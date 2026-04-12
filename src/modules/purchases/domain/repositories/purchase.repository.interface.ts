import type { Purchase } from '../entities/purchase.entity';

export interface IPurchaseRepository {
  create(data: { productId: number; cantidad: number }): Promise<Purchase>;
}
