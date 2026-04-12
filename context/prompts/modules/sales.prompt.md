# Sales Module Prompt

Crear módulo Sales usando Clean Architecture.

---

## Estructura

- application/
  - use-cases/
    - create-sale.use-case.ts

- domain/
  - entities/
    - sale.entity.ts
  - repositories/
    - sale.repository.interface.ts

- infrastructure/
  - repositories/
    - sale.repository.ts

- presentation/
  - controllers/
    - sales.controller.ts
  - dtos/

- sales.module.ts

---

## Endpoint

- POST /sales

---

## Entrada

- productId
- cantidad

---

## Lógica

- Validar producto existente
- Validar stock suficiente
- Reducir stock usando InventoryService

---

## Reglas

- UseCase contiene lógica
- NO HTTP entre módulos
- Inyectar InventoryService
- No usar Prisma directamente en use-case

---

## Importante

- Venta es inmutable (no update)
- Mantener MVP simple