import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import {
  INVENTORY_STOCK_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
} from './inventory.tokens';
import { InventoryStockService } from './infrastructure/services/inventory-stock.service';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { ProductController } from './presentation/controllers/product.controller';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductsUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
    {
      provide: INVENTORY_STOCK_TOKEN,
      useClass: InventoryStockService,
    },
  ],
  exports: [INVENTORY_STOCK_TOKEN, PRODUCT_REPOSITORY_TOKEN],
})
export class InventoryModule {}
