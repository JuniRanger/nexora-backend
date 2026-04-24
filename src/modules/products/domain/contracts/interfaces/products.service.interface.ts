import { CreateProductRequestDto } from '../../../presentation/dto/requests/create-product.request';
import { UpdateProductRequestDto } from '../../../presentation/dto/requests/update-product.request';
import { ProductResponseDto } from '../../../presentation/dto/responses/product.response';

export interface IProductsService {
  create(dto: CreateProductRequestDto): Promise<ProductResponseDto>;
  findAll(): Promise<ProductResponseDto[]>;
  findOne(id: number): Promise<ProductResponseDto>;
  update(id: number, dto: UpdateProductRequestDto): Promise<ProductResponseDto>;
  remove(id: number): Promise<void>;
}
