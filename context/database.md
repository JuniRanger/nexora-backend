# Nexora ERP - Database

## ORM
Prisma

## Base de datos
Relacional (PostgreSQL recomendado)

---

## Modelos principales

### User

- id: Int (PK, autoincremental)
- email: String (único)
- password: String
- createdAt: DateTime

Notas:
- No se valida autenticación aún (MVP)
- Preparado para roles en el futuro

---

### Product

- id: Int (PK, autoincremental)
- nombre: String
- precio: Float
- stock: Int
- createdAt: DateTime

---

### Sale

- id: Int (PK)
- userId: Int (FK → User)
- total: Float
- createdAt: DateTime

---

### SaleItem

- id: Int (PK)
- saleId: Int (FK → Sale)
- productId: Int (FK → Product)
- cantidad: Int
- precioUnitario: Float
- subtotal: Float

---

### Purchase

- id: Int (PK)
- userId: Int (FK → User)
- total: Float
- createdAt: DateTime

---

### PurchaseItem

- id: Int (PK)
- purchaseId: Int (FK → Purchase)
- productId: Int (FK → Product)
- cantidad: Int
- costoUnitario: Float
- subtotal: Float

---

### InventoryMovement

- id: Int (PK)
- productId: Int (FK → Product)
- tipo: String (IN | OUT)
- cantidad: Int
- referenciaId: Int (saleId o purchaseId)
- referenciaTipo: String (SALE | PURCHASE)
- createdAt: DateTime

---

### AccountingEntry

- id: Int (PK)
- tipo: String (INCOME | EXPENSE)
- monto: Float
- descripcion: String
- referenciaId: Int (opcional)
- createdAt: DateTime

---

## Reglas de negocio

### Producto
- El stock nunca puede ser negativo
- El precio debe ser mayor a 0
- El nombre es obligatorio

---

### Usuario
- El email debe ser único
- El password no se usa aún (login mock)

---

### Ventas
- No permitir ventas sin stock suficiente
- El total debe ser la suma de los items
- No editar ventas (inmutables)

---

### Compras
- Aumentan el stock
- El total debe coincidir con los items

---

### Inventario
- Todo movimiento debe registrarse en InventoryMovement
- No modificar stock directamente sin registrar movimiento

---

### Contabilidad
- Los montos deben ser mayores a 0
- No editar registros financieros (histórico)

---

## Operaciones clave

### Productos
- CRUD completo
- Ajuste de stock (interno)

---

### Ventas
- Crear venta
- Consultar ventas

---

### Compras
- Crear compra
- Consultar compras

---

### Inventario
- Registrar movimientos
- Consultar historial

---

### Contabilidad
- Registrar ingresos
- Registrar egresos
- Consultar movimientos

---

## Relaciones

- User → Sales (1:N)
- User → Purchases (1:N)
- Sale → SaleItems (1:N)
- Purchase → PurchaseItems (1:N)
- Product → SaleItems (1:N)
- Product → PurchaseItems (1:N)
- Product → InventoryMovements (1:N)

---

## Consideraciones importantes

- No implementar todas las relaciones aún en el MVP
- No implementar lógica compleja todavía
- Definición lista para escalar sin rediseño

---

## Futuro

- Roles (admin, empleado)
- Multi-sucursal
- Reportes financieros
- IA (predicción de inventario, recomendaciones)