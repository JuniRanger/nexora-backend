import { CreateProductRequestDto } from '../../../presentation/dto/requests/create-product.request';
import { UpdateProductRequestDto } from '../../../presentation/dto/requests/update-product.request';
import { ProductEntity } from '../../entities/product.entity';

export interface IProductsRepository {
  create(data: CreateProductRequestDto): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findById(id: number): Promise<ProductEntity | null>;
  update(id: number, data: UpdateProductRequestDto): Promise<ProductEntity>;
  softDelete(id: number): Promise<void>;
}
