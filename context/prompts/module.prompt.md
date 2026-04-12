# Module Generation Prompt

Usando todo el contexto de Nexora ERP:

Crea el módulo solicitado siguiendo Clean Architecture.

Estructura obligatoria:

- application/
  - use-cases/
  - interfaces/ (si aplica)

- domain/
  - entities/
  - repositories/ (interfaces)

- infrastructure/
  - repositories/ (implementaciones)
  - services/ (si aplica)

- presentation/
  - controllers/
  - dtos/

- module.module.ts

Requisitos:

- UseCases deben contener la lógica
- Controllers solo manejan HTTP
- Infrastructure implementa interfaces
- Usar inyección de dependencias con tokens

Reglas:

- No usar implementaciones concretas en use-cases
- No usar Prisma fuera de infrastructure
- Mantener simplicidad (MVP)

Generar solo lo necesario para el módulo solicitado.