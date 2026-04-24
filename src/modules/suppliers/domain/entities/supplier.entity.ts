export interface SupplierEntity {
  id: number;
  nombre: string;
  telefono: string | null;
  email: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
