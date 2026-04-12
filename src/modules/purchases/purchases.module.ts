import { Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { CreatePurchaseUseCase } from './application/use-cases/create-purchase.use-case';
import { PURCHASE_REPOSITORY_TOKEN } from './purchases.tokens';
import { PurchaseRepository } from './infrastructure/repositories/purchase.repository';
import { PurchasesController } from './presentation/controllers/purchases.controller';

@Module({
  imports: [InventoryModule],
  controllers: [PurchasesController],
  providers: [
    CreatePurchaseUseCase,
    {
      provide: PURCHASE_REPOSITORY_TOKEN,
      useClass: PurchaseRepository,
    },
  ],
})
export class PurchasesModule {}
