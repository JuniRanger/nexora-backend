export interface ClientEntity {
  id: number;
  nombre: string;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
