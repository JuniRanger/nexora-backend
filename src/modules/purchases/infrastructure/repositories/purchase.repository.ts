import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { Purchase } from '../../domain/entities/purchase.entity';
import type { IPurchaseRepository } from '../../domain/repositories/purchase.repository.interface';

@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    productId: number;
    cantidad: number;
  }): Promise<Purchase> {
    const row = await this.prisma.purchase.create({
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
  }): Purchase {
    return {
      id: row.id,
      productId: row.productId,
      cantidad: row.cantidad,
      createdAt: row.createdAt,
    };
  }
}
