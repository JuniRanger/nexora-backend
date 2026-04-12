import type { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(data: {
    nombre: string;
    precio: number;
    stock: number;
  }): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(
    id: number,
    data: { nombre?: string; precio?: number; stock?: number },
  ): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
  aumentarStock(productId: number, cantidad: number): Promise<Product>;
  reducirStock(productId: number, cantidad: number): Promise<Product>;
}
