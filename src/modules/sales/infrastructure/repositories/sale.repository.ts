import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { Sale } from '../../domain/entities/sale.entity';
import type { ISaleRepository } from '../../domain/repositories/sale.repository.interface';

@Injectable()
export class SaleRepository implements ISaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { productId: number; cantidad: number }): Promise<Sale> {
    const row = await this.prisma.sale.create({
      data: {
        productId: data.productId,
        cantidad: data.cantidad,
      },
    });
    return this.toDomain(row);
  }

  private toDomain(row: {
    id: number;
    productId: number;
    cantidad: number;
    createdAt: Date;
  }): Sale {
    return {
      id: row.id,
      productId: row.productId,
      cantidad: row.cantidad,
      createdAt: row.createdAt,
    };
  }
}
