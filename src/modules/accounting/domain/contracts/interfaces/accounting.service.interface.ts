import { CreateAccountingEntryRequestDto } from '../../../presentation/dto/requests/create-accounting-entry.request';
import { UpdateAccountingEntryRequestDto } from '../../../presentation/dto/requests/update-accounting-entry.request';
import { AccountingEntryResponseDto } from '../../../presentation/dto/responses/accounting-entry.response';

export interface IAccountingService {
  create(dto: CreateAccountingEntryRequestDto): Promise<AccountingEntryResponseDto>;
  findAll(): Promise<AccountingEntryResponseDto[]>;
  findOne(id: number): Promise<AccountingEntryResponseDto>;
  update(
    id: number,
    dto: UpdateAccountingEntryRequestDto,
  ): Promise<AccountingEntryResponseDto>;
  remove(id: number): Promise<void>;
}
