import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpenseUseCase } from '../../application/use-cases/create-expense.use-case';
import { CreateIncomeUseCase } from '../../application/use-cases/create-income.use-case';
import { CreateAccountingEntryDto } from '../dtos/create-accounting-entry.dto';

@Controller('accounting')
export class AccountingController {
  constructor(
    private readonly createIncomeUseCase: CreateIncomeUseCase,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
  ) {}

  @Post('income')
  createIncome(@Body() body: CreateAccountingEntryDto) {
    return this.createIncomeUseCase.execute(body);
  }

  @Post('expense')
  createExpense(@Body() body: CreateAccountingEntryDto) {
    return this.createExpenseUseCase.execute(body);
  }
}
