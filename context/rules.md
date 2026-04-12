# Nexora ERP - Rules

## Arquitectura

- Controllers NO deben contener lógica de negocio
- UseCases contienen la lógica de aplicación
- Services son detalles de infraestructura (NO lógica de negocio principal)
- Domain define entidades y contratos (interfaces)
- Usar inyección de dependencias basada en interfaces

---

## Inversión de dependencias

- Application depende de interfaces, no implementaciones
- Infrastructure implementa esas interfaces
- No importar clases concretas en use-cases

Ejemplo correcto:
UseCase → IUserRepository

Ejemplo incorrecto:
UseCase → PrismaService ❌

---

## Inyección de dependencias

- Usar el sistema de DI de NestJS
- Inyectar dependencias mediante tokens

Ejemplo:
provide: 'IUserRepository'
useClass: UserRepository

---

## Comunicación entre módulos

- NO usar HTTP entre módulos
- Usar servicios internos mediante DI

Ejemplo:
SalesUseCase → InventoryService

---

## Código

- Mantener código simple (MVP)
- No sobre-ingeniería
- No agregar capas innecesarias
- Usar nombres claros y consistentes

---

## Validaciones

- Validar inputs con DTOs (en presentation)
- Manejar errores en use-cases
- No permitir stock negativo

---

## Base de datos

- Usar Prisma SOLO en infrastructure
- No acceder a la DB desde controllers
- No acceder a la DB desde use-cases directamente
- Usar repositories (interfaces + implementación)

---

## Restricciones actuales (MVP)

- NO implementar autenticación real
- NO usar guards
- NO hashing de contraseñas
- NO roles avanzados
- Login completamente mock

---

## Buenas prácticas

- Métodos pequeños y claros
- Evitar duplicación de lógica
- Código legible sobre código complejo
- Separar claramente responsabilidades por capa

---

## Anti-patrones (PROHIBIDO)

- Lógica de negocio en controllers ❌
- Use-cases llamando Prisma directamente ❌
- Dependencias a clases concretas ❌
- HTTP entre módulos ❌
- Sobreingeniería innecesaria ❌

---

## Importante

- Este proyecto es un MVP
- Prioridad: arquitectura clara + funcionalidad
- Preparado para escalar sin refactor masivo
- No optimizar prematuramente