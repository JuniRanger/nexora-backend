import { Module } from '@nestjs/common';
import { CreateExpenseUseCase } from './application/use-cases/create-expense.use-case';
import { CreateIncomeUseCase } from './application/use-cases/create-income.use-case';
import { ACCOUNTING_REPOSITORY_TOKEN } from './accounting.tokens';
import { AccountingRepository } from './infrastructure/repositories/accounting.repository';
import { AccountingController } from './presentation/controllers/accounting.controller';

@Module({
  controllers: [AccountingController],
  providers: [
    CreateIncomeUseCase,
    CreateExpenseUseCase,
    {
      provide: ACCOUNTING_REPOSITORY_TOKEN,
      useClass: AccountingRepository,
    },
  ],
})
export class AccountingModule {}
