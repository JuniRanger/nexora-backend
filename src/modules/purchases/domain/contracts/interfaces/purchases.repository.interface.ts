import { CreatePurchaseRequestDto } from '../../../presentation/dto/requests/create-purchase.request';
import { UpdatePurchaseRequestDto } from '../../../presentation/dto/requests/update-purchase.request';
import { PurchaseEntity } from '../../entities/purchase.entity';

export interface IPurchasesRepository {
  create(data: CreatePurchaseRequestDto): Promise<PurchaseEntity>;
  findAll(): Promise<PurchaseEntity[]>;
  findById(id: number): Promise<PurchaseEntity | null>;
  update(id: number, data: UpdatePurchaseRequestDto): Promise<PurchaseEntity>;
  softDelete(id: number): Promise<void>;
}
