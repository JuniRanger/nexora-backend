import { Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { CreateSaleUseCase } from './application/use-cases/create-sale.use-case';
import { SALE_REPOSITORY_TOKEN } from './sales.tokens';
import { SaleRepository } from './infrastructure/repositories/sale.repository';
import { SalesController } from './presentation/controllers/sales.controller';

@Module({
  imports: [InventoryModule],
  controllers: [SalesController],
  providers: [
    CreateSaleUseCase,
    {
      provide: SALE_REPOSITORY_TOKEN,
      useClass: SaleRepository,
    },
  ],
})
export class SalesModule {}
