import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IInventoryStock } from '../../../inventory/application/interfaces/inventory-stock.interface';
import type { IProductRepository } from '../../../inventory/domain/repositories/product.repository.interface';
import {
  INVENTORY_STOCK_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from '../../../inventory/inventory.tokens';
import type { Sale } from '../../domain/entities/sale.entity';
import type { ISaleRepository } from '../../domain/repositories/sale.repository.interface';
import { SALE_REPOSITORY_TOKEN } from '../../sales.tokens';

export type CreateSaleInput = {
  productId: number;
  cantidad: number;
};

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
    @Inject(INVENTORY_STOCK_TOKEN)
    private readonly inventoryStock: IInventoryStock,
    @Inject(SALE_REPOSITORY_TOKEN)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(input: CreateSaleInput): Promise<Sale> {
    if (input.cantidad <= 0) {
      throw new BadRequestException('cantidad must be greater than 0');
    }

    const product = await this.productRepository.findById(input.productId);
    if (!product) {
      throw new NotFoundException(`Product ${input.productId} not found`);
    }
    if (product.stock < input.cantidad) {
      throw new BadRequestException('Insufficient stock');
    }

    await this.inventoryStock.reducirStock(input.productId, input.cantidad);

    try {
      return await this.saleRepository.create({
        productId: input.productId,
        cantidad: input.cantidad,
      });
    } catch (err) {
      await this.inventoryStock.aumentarStock(input.productId, input.cantidad);
      throw err;
    }
  }
}
