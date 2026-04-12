import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Product } from '../../domain/entities/product.entity';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '../../inventory.tokens';

export type UpdateProductInput = {
  id: number;
  nombre?: string;
  precio?: number;
  stock?: number;
};

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    if (
      input.nombre === undefined &&
      input.precio === undefined &&
      input.stock === undefined
    ) {
      throw new BadRequestException('At least one field must be provided');
    }
    if (input.precio !== undefined && input.precio <= 0) {
      throw new BadRequestException('precio must be greater than 0');
    }
    if (input.stock !== undefined && input.stock < 0) {
      throw new BadRequestException('stock cannot be negative');
    }

    const updated = await this.productRepository.update(input.id, {
      nombre: input.nombre,
      precio: input.precio,
      stock: input.stock,
    });
    if (!updated) {
      throw new NotFoundException(`Product ${input.id} not found`);
    }
    return updated;
  }
}
