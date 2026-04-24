import { CreateSaleRequestDto } from '../../../presentation/dto/requests/create-sale.request';
import { UpdateSaleRequestDto } from '../../../presentation/dto/requests/update-sale.request';
import { SaleResponseDto } from '../../../presentation/dto/responses/sale.response';

export interface ISalesService {
  create(dto: CreateSaleRequestDto): Promise<SaleResponseDto>;
  findAll(): Promise<SaleResponseDto[]>;
  findOne(id: number): Promise<SaleResponseDto>;
  update(id: number, dto: UpdateSaleRequestDto): Promise<SaleResponseDto>;
  remove(id: number): Promise<void>;
}
