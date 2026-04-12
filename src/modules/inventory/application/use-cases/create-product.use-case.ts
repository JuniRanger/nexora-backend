import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { Product } from '../../domain/entities/product.entity';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '../../inventory.tokens';

export type CreateProductInput = {
  nombre: string;
  precio: number;
  stock: number;
};

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    if (input.precio <= 0) {
      throw new BadRequestException('precio must be greater than 0');
    }
    if (input.stock < 0) {
      throw new BadRequestException('stock cannot be negative');
    }
    return this.productRepository.create({
      nombre: input.nombre,
      precio: input.precio,
      stock: input.stock,
    });
  }
}
