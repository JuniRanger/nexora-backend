import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductRequestDto } from '../../presentation/dto/requests/create-product.request';
import { UpdateProductRequestDto } from '../../presentation/dto/requests/update-product.request';
import { IProductsRepository } from '../../domain/contracts/interfaces/products.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductRequestDto): Promise<ProductEntity> {
    const created = await this.prisma.product.create({
      data: {
        nombre: data.nombre,
        sku: data.sku,
        precio: new Prisma.Decimal(data.precio),
        costo: new Prisma.Decimal(data.costo),
        stock: data.stock,
      },
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductEntity[]> {
    const rows = await this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { id: 'desc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  async findById(id: number): Promise<ProductEntity | null> {
    const row = await this.prisma.product.findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async update(id: number, data: UpdateProductRequestDto): Promise<ProductEntity> {
    try {
      const row = await this.prisma.product.update({
        where: { id },
        data: {
          ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
          ...(data.sku !== undefined ? { sku: data.sku } : {}),
          ...(data.precio !== undefined
            ? { precio: new Prisma.Decimal(data.precio) }
            : {}),
          ...(data.costo !== undefined
            ? { costo: new Prisma.Decimal(data.costo) }
            : {}),
          ...(data.stock !== undefined ? { stock: data.stock } : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
      });
      return this.toEntity(row);
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const current = await this.findById(id);
    if (!current || !current.isActive) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private toEntity(row: {
    id: number;
    nombre: string;
    sku: string;
    precio: Prisma.Decimal;
    costo: Prisma.Decimal;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): ProductEntity {
    return {
      id: row.id,
      nombre: row.nombre,
      sku: row.sku,
      precio: Number(row.precio),
      costo: Number(row.costo),
      stock: row.stock,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
