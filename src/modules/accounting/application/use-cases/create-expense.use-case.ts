import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { AccountingEntry } from '../../domain/entities/accounting-entry.entity';
import type { IAccountingRepository } from '../../domain/repositories/accounting.repository.interface';
import { ACCOUNTING_REPOSITORY_TOKEN } from '../../accounting.tokens';

export type CreateExpenseInput = {
  monto: number;
  descripcion: string;
};

@Injectable()
export class CreateExpenseUseCase {
  constructor(
    @Inject(ACCOUNTING_REPOSITORY_TOKEN)
    private readonly accountingRepository: IAccountingRepository,
  ) {}

  async execute(input: CreateExpenseInput): Promise<AccountingEntry> {
    if (input.monto <= 0) {
      throw new BadRequestException('monto must be greater than 0');
    }
    return this.accountingRepository.createExpense({
      monto: input.monto,
      descripcion: input.descripcion,
    });
  }
}
