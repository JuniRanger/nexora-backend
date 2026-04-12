# Purchases Module Prompt

Crear módulo Purchases usando Clean Architecture.

---

## Estructura

- application/
  - use-cases/
    - create-purchase.use-case.ts

- domain/
  - entities/
    - purchase.entity.ts
  - repositories/
    - purchase.repository.interface.ts

- infrastructure/
  - repositories/
    - purchase.repository.ts

- presentation/
  - controllers/
    - purchases.controller.ts
  - dtos/

- purchases.module.ts

---

## Endpoint

- POST /purchases

---

## Entrada

- productId
- cantidad

---

## Lógica

- Validar producto
- Aumentar stock usando InventoryService

---

## Reglas

- UseCase contiene lógica
- NO HTTP entre módulos
- Usar DI con interfaces
- No usar Prisma en use-case

---

## Importante

- Compra es inmutable
- Mantener MVP simple