# Accounting Module Prompt

Crear módulo Accounting usando Clean Architecture.

---

## Estructura

- application/
  - use-cases/
    - create-income.use-case.ts
    - create-expense.use-case.ts

- domain/
  - entities/
    - accounting-entry.entity.ts
  - repositories/
    - accounting.repository.interface.ts

- infrastructure/
  - repositories/
    - accounting.repository.ts

- presentation/
  - controllers/
    - accounting.controller.ts
  - dtos/

- accounting.module.ts

---

## Endpoints

- POST /accounting/income
- POST /accounting/expense

---

## Entrada

- monto
- descripcion

---

## Reglas

- monto > 0
- No lógica en controllers
- UseCases contienen lógica
- Repository es interfaz
- Infrastructure implementa

---

## Importante

- No integración aún con otros módulos
- No update (histórico)
- Mantener MVP