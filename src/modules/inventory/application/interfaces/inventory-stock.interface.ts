export interface IInventoryStock {
  aumentarStock(productId: number, cantidad: number): Promise<void>;
  reducirStock(productId: number, cantidad: number): Promise<void>;
}
