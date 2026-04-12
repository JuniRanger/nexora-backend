import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { Product } from '../../domain/entities/product.entity';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    nombre: string;
    precio: number;
    stock: number;
  }): Promise<Product> {
    const row = await this.prisma.product.create({ data });
    return this.toDomain(row);
  }

  async findAll(): Promise<Product[]> {
    const rows = await this.prisma.product.findMany({ orderBy: { id: 'asc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async findById(id: number): Promise<Product | null> {
    const row = await this.prisma.product.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async update(
    id: number,
    data: { nombre?: string; precio?: number; stock?: number },
  ): Promise<Product | null> {
    const exists = await this.prisma.product.findUnique({ where: { id } });
    if (!exists) {
      return null;
    }
    const row = await this.prisma.product.update({
      where: { id },
      data: {
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(data.precio !== undefined ? { precio: data.precio } : {}),
        ...(data.stock !== undefined ? { stock: data.stock } : {}),
      },
    });
    return this.toDomain(row);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.prisma.product.deleteMany({ where: { id } });
    return result.count > 0;
  }

  async aumentarStock(productId: number, cantidad: number): Promise<Product> {
    const exists = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!exists) {
      throw new NotFoundException(`Product ${productId} not found`);
    }
    const row = await this.prisma.product.update({
      where: { id: productId },
      data: { stock: { increment: cantidad } },
    });
    return this.toDomain(row);
  }

  async reducirStock(productId: number, cantidad: number): Promise<Product> {
    const result = await this.prisma.product.updateMany({
      where: { id: productId, stock: { gte: cantidad } },
      data: { stock: { decrement: cantidad } },
    });
    if (result.count === 0) {
      const exists = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!exists) {
        throw new NotFoundException(`Product ${productId} not found`);
      }
      throw new BadRequestException('Insufficient stock');
    }
    const row = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });
    return this.toDomain(row);
  }

  private toDomain(row: {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    createdAt: Date;
  }): Product {
    return {
      id: row.id,
      nombre: row.nombre,
      precio: row.precio,
      stock: row.stock,
      createdAt: row.createdAt,
    };
  }
}
