import type { Sale } from '../entities/sale.entity';

export interface ISaleRepository {
  create(data: { productId: number; cantidad: number }): Promise<Sale>;
}
