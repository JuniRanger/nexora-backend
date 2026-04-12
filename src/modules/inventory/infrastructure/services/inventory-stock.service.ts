import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { IInventoryStock } from '../../application/interfaces/inventory-stock.interface';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '../../inventory.tokens';

@Injectable()
export class InventoryStockService implements IInventoryStock {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async aumentarStock(productId: number, cantidad: number): Promise<void> {
    if (cantidad <= 0) {
      throw new BadRequestException('cantidad must be greater than 0');
    }
    await this.productRepository.aumentarStock(productId, cantidad);
  }

  async reducirStock(productId: number, cantidad: number): Promise<void> {
    if (cantidad <= 0) {
      throw new BadRequestException('cantidad must be greater than 0');
    }
    await this.productRepository.reducirStock(productId, cantidad);
  }
}
