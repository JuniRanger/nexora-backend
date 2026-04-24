import { Module } from '@nestjs/common';
import { SalesService } from './application/services/sales.service';
import { SalesRepository } from './infrastructure/repositories/sales.repository';
import { SalesController } from './presentation/controllers/sales.controller';
import { SALES_REPOSITORY_TOKEN, SALES_SERVICE_TOKEN } from './sales.tokens';

@Module({
  controllers: [SalesController],
  providers: [
    SalesService,
    {
      provide: SALES_SERVICE_TOKEN,
      useExisting: SalesService,
    },
    {
      provide: SALES_REPOSITORY_TOKEN,
      useClass: SalesRepository,
    },
  ],
  exports: [SalesService, SALES_SERVICE_TOKEN, SALES_REPOSITORY_TOKEN],
})
export class SalesModule {}
