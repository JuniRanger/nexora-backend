import { Module } from '@nestjs/common';
import { AccountingService } from './application/services/accounting.service';
import { AccountingRepository } from './infrastructure/repositories/accounting.repository';
import { AccountingController } from './presentation/controllers/accounting.controller';
import {
  ACCOUNTING_REPOSITORY_TOKEN,
  ACCOUNTING_SERVICE_TOKEN,
} from './accounting.tokens';

@Module({
  controllers: [AccountingController],
  providers: [
    AccountingService,
    {
      provide: ACCOUNTING_SERVICE_TOKEN,
      useExisting: AccountingService,
    },
    {
      provide: ACCOUNTING_REPOSITORY_TOKEN,
      useClass: AccountingRepository,
    },
  ],
  exports: [AccountingService, ACCOUNTING_SERVICE_TOKEN, ACCOUNTING_REPOSITORY_TOKEN],
})
export class AccountingModule {}
