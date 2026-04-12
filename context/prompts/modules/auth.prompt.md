# Auth Module Prompt

Usando todo el contexto de Nexora ERP:

Crea el módulo Auth siguiendo Clean Architecture.

Estructura:

- application/
  - use-cases/
    - login.use-case.ts
    - register.use-case.ts
  - interfaces/ (si aplica)

- domain/
  - entities/
  - repositories/
    - user.repository.interface.ts

- infrastructure/
  - repositories/
    - user.repository.ts
  - services/ (opcional)

- presentation/
  - controllers/
    - auth.controller.ts
  - dtos/

- auth.module.ts

---

## Requisitos

- Endpoint: POST /auth/login
- Recibe: email, password
- NO validar credenciales
- NO usar base de datos real
- NO hashing
- NO guards

Respuesta:
{
  access_token: "fake-jwt-token"
}

---

## Flujo

Controller → LoginUseCase → IUserRepository (mock) → respuesta

---

## Reglas

- Controller NO tiene lógica
- UseCase contiene la lógica
- Repository es interfaz en domain
- Infrastructure implementa la interfaz (mock)
- Usar inyección de dependencias con tokens
- No usar Prisma aún

Mantener simplicidad (MVP)