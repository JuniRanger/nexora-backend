import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequestDto } from '../../presentation/dto/requests/create-product.request';
import { UpdateProductRequestDto } from '../../presentation/dto/requests/update-product.request';
import { ProductResponseDto } from '../../presentation/dto/responses/product.response';
import { IProductsService } from '../../domain/contracts/interfaces/products.service.interface';
import { IProductsRepository } from '../../domain/contracts/interfaces/products.repository.interface';
import { PRODUCTS_REPOSITORY_TOKEN } from '../../products.tokens';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  create(dto: CreateProductRequestDto): Promise<ProductResponseDto> {
    return this.productsRepository.create(dto);
  }

  findAll(): Promise<ProductResponseDto[]> {
    return this.productsRepository.findAll();
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findById(id);
    if (!product || !product.isActive) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, dto: UpdateProductRequestDto): Promise<ProductResponseDto> {
    return this.productsRepository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.productsRepository.softDelete(id);
  }
}
