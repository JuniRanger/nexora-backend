import { Module } from '@nestjs/common';
import { PurchasesService } from './application/services/purchases.service';
import { PurchasesRepository } from './infrastructure/repositories/purchases.repository';
import { PurchasesController } from './presentation/controllers/purchases.controller';
import {
  PURCHASES_REPOSITORY_TOKEN,
  PURCHASES_SERVICE_TOKEN,
} from './purchases.tokens';

@Module({
  controllers: [PurchasesController],
  providers: [
    PurchasesService,
    {
      provide: PURCHASES_SERVICE_TOKEN,
      useExisting: PurchasesService,
    },
    {
      provide: PURCHASES_REPOSITORY_TOKEN,
      useClass: PurchasesRepository,
    },
  ],
  exports: [PurchasesService, PURCHASES_SERVICE_TOKEN, PURCHASES_REPOSITORY_TOKEN],
})
export class PurchasesModule {}
