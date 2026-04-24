import { CreateSupplierRequestDto } from '../../../presentation/dto/requests/create-supplier.request';
import { UpdateSupplierRequestDto } from '../../../presentation/dto/requests/update-supplier.request';
import { SupplierResponseDto } from '../../../presentation/dto/responses/supplier.response';

export interface ISuppliersService {
  create(dto: CreateSupplierRequestDto): Promise<SupplierResponseDto>;
  findAll(): Promise<SupplierResponseDto[]>;
  findOne(id: number): Promise<SupplierResponseDto>;
  update(id: number, dto: UpdateSupplierRequestDto): Promise<SupplierResponseDto>;
  remove(id: number): Promise<void>;
}
