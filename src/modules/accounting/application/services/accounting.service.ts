import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountingEntryRequestDto } from '../../presentation/dto/requests/create-accounting-entry.request';
import { UpdateAccountingEntryRequestDto } from '../../presentation/dto/requests/update-accounting-entry.request';
import { AccountingEntryResponseDto } from '../../presentation/dto/responses/accounting-entry.response';
import { IAccountingService } from '../../domain/contracts/interfaces/accounting.service.interface';
import { IAccountingRepository } from '../../domain/contracts/interfaces/accounting.repository.interface';
import { ACCOUNTING_REPOSITORY_TOKEN } from '../../accounting.tokens';

@Injectable()
export class AccountingService implements IAccountingService {
  constructor(
    @Inject(ACCOUNTING_REPOSITORY_TOKEN)
    private readonly accountingRepository: IAccountingRepository,
  ) {}

  create(dto: CreateAccountingEntryRequestDto): Promise<AccountingEntryResponseDto> {
    return this.accountingRepository.create(dto);
  }

  findAll(): Promise<AccountingEntryResponseDto[]> {
    return this.accountingRepository.findAll();
  }

  async findOne(id: number): Promise<AccountingEntryResponseDto> {
    const entry = await this.accountingRepository.findById(id);
    if (!entry || !entry.isActive) {
      throw new NotFoundException(`Accounting entry with id ${id} not found`);
    }
    return entry;
  }

  update(
    id: number,
    dto: UpdateAccountingEntryRequestDto,
  ): Promise<AccountingEntryResponseDto> {
    return this.accountingRepository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.accountingRepository.softDelete(id);
  }
}
