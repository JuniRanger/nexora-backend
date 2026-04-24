import { CreatePurchaseRequestDto } from '../../../presentation/dto/requests/create-purchase.request';
import { UpdatePurchaseRequestDto } from '../../../presentation/dto/requests/update-purchase.request';
import { PurchaseResponseDto } from '../../../presentation/dto/responses/purchase.response';

export interface IPurchasesService {
  create(dto: CreatePurchaseRequestDto): Promise<PurchaseResponseDto>;
  findAll(): Promise<PurchaseResponseDto[]>;
  findOne(id: number): Promise<PurchaseResponseDto>;
  update(id: number, dto: UpdatePurchaseRequestDto): Promise<PurchaseResponseDto>;
  remove(id: number): Promise<void>;
}
