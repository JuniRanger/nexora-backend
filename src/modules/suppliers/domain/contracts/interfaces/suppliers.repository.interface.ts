import { SupplierEntity } from '../../entities/supplier.entity';
import { CreateSupplierRequestDto } from '../../../presentation/dto/requests/create-supplier.request';
import { UpdateSupplierRequestDto } from '../../../presentation/dto/requests/update-supplier.request';

export interface ISuppliersRepository {
  create(data: CreateSupplierRequestDto): Promise<SupplierEntity>;
  findAll(): Promise<SupplierEntity[]>;
  findById(id: number): Promise<SupplierEntity | null>;
  update(id: number, data: UpdateSupplierRequestDto): Promise<SupplierEntity>;
  softDelete(id: number): Promise<void>;
}
