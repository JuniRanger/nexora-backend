import { Module } from '@nestjs/common';
import { ProductsService } from './application/services/products.service';
import { ProductsRepository } from './infrastructure/repositories/products.repository';
import { ProductsController } from './presentation/controllers/products.controller';
import { PRODUCTS_REPOSITORY_TOKEN, PRODUCTS_SERVICE_TOKEN } from './products.tokens';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCTS_SERVICE_TOKEN,
      useExisting: ProductsService,
    },
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,
      useClass: ProductsRepository,
    },
  ],
  exports: [ProductsService, PRODUCTS_SERVICE_TOKEN, PRODUCTS_REPOSITORY_TOKEN],
})
export class ProductsModule {}
