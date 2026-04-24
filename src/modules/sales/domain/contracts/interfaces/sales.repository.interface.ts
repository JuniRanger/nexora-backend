import { CreateSaleRequestDto } from '../../../presentation/dto/requests/create-sale.request';
import { UpdateSaleRequestDto } from '../../../presentation/dto/requests/update-sale.request';
import { SaleEntity } from '../../entities/sale.entity';

export interface ISalesRepository {
  create(data: CreateSaleRequestDto): Promise<SaleEntity>;
  findAll(): Promise<SaleEntity[]>;
  findById(id: number): Promise<SaleEntity | null>;
  update(id: number, data: UpdateSaleRequestDto): Promise<SaleEntity>;
  softDelete(id: number): Promise<void>;
}
