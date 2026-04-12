import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IInventoryStock } from '../../../inventory/application/interfaces/inventory-stock.interface';
import type { IProductRepository } from '../../../inventory/domain/repositories/product.repository.interface';
import type { Purchase } from '../../domain/entities/purchase.entity';
import type { IPurchaseRepository } from '../../domain/repositories/purchase.repository.interface';
import {
  INVENTORY_STOCK_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from '../../../inventory/inventory.tokens';
import { PURCHASE_REPOSITORY_TOKEN } from '../../purchases.tokens';

export type CreatePurchaseInput = {
  productId: number;
  cantidad: number;
};

@Injectable()
export class CreatePurchaseUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
    @Inject(INVENTORY_STOCK_TOKEN)
    private readonly inventoryStock: IInventoryStock,
    @Inject(PURCHASE_REPOSITORY_TOKEN)
    private readonly purchaseRepository: IPurchaseRepository,
  ) {}

  async execute(input: CreatePurchaseInput): Promise<Purchase> {
    if (input.cantidad <= 0) {
      throw new BadRequestException('cantidad must be greater than 0');
    }

    const product = await this.productRepository.findById(input.productId);
    if (!product) {
      throw new NotFoundException(`Product ${input.productId} not found`);
    }

    await this.inventoryStock.aumentarStock(input.productId, input.cantidad);

    try {
      return await this.purchaseRepository.create({
        productId: input.productId,
        cantidad: input.cantidad,
      });
    } catch (err) {
      await this.inventoryStock.reducirStock(input.productId, input.cantidad);
      throw err;
    }
  }
}
