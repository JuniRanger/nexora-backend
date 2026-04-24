import { CreateAccountingEntryRequestDto } from '../../../presentation/dto/requests/create-accounting-entry.request';
import { UpdateAccountingEntryRequestDto } from '../../../presentation/dto/requests/update-accounting-entry.request';
import { AccountingEntryEntity } from '../../entities/accounting-entry.entity';

export interface IAccountingRepository {
  create(data: CreateAccountingEntryRequestDto): Promise<AccountingEntryEntity>;
  findAll(): Promise<AccountingEntryEntity[]>;
  findById(id: number): Promise<AccountingEntryEntity | null>;
  update(id: number, data: UpdateAccountingEntryRequestDto): Promise<AccountingEntryEntity>;
  softDelete(id: number): Promise<void>;
}
