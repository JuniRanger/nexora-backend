# Inventory Module Prompt

Crear módulo Inventory usando Clean Architecture.

---

## Estructura

- application/
  - use-cases/
    - create-product.use-case.ts
    - get-products.use-case.ts
    - get-product.use-case.ts
    - update-product.use-case.ts
    - delete-product.use-case.ts

- domain/
  - entities/
    - product.entity.ts
  - repositories/
    - product.repository.interface.ts

- infrastructure/
  - repositories/
    - product.repository.ts (Prisma)

- presentation/
  - controllers/
    - product.controller.ts
  - dtos/

- inventory.module.ts

---

## Endpoints

- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

---

## Reglas

- UseCases contienen la lógica
- Controllers sin lógica
- Repository es interfaz
- Infrastructure usa Prisma

---

## Funciones internas (NO endpoints)

- aumentarStock(productId, cantidad)
- reducirStock(productId, cantidad)

---

## Validaciones

- precio > 0
- stock >= 0

Mantener simplicidad (MVP)