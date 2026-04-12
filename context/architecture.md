# Nexora ERP - Architecture

## Tipo de sistema
Monolito modular

## Enfoque
- Clean Architecture (ligera, aplicada)
- DDD (enfoque práctico, no estricto)

## Objetivo
Construir un ERP modular escalable, desacoplado y preparado para evolucionar hacia integración con IA.

---

## Principios

- Separación de responsabilidades
- Inversión de dependencias
- Bajo acoplamiento entre módulos
- Alta cohesión dentro de cada módulo
- Código orientado a interfaces (contratos)

---

## Estructura general

src/
 ├── config/
 ├── common/
 ├── modules/
 │   ├── auth/
 │   ├── inventory/
 │   ├── sales/
 │   ├── purchases/
 │   ├── accounting/

---

## Estructura por módulo

Cada módulo sigue esta organización:

module/
 ├── application/
 │    ├── use-cases/
 │    └── interfaces/
 │
 ├── domain/
 │    ├── entities/
 │    └── repositories/
 │
 ├── infrastructure/
 │    ├── services/
 │    └── repositories/
 │
 ├── presentation/
 │    ├── controllers/
 │    └── dtos/
 │
 └── module.module.ts

---

## Capas y responsabilidades

### Presentation
- Maneja HTTP (controllers)
- Valida entrada (DTOs)
- No contiene lógica de negocio

---

### Application
- Contiene casos de uso (use-cases)
- Orquesta la lógica del sistema
- Depende de interfaces (no implementaciones)

---

### Domain
- Define entidades del negocio
- Define contratos (interfaces de repositorios)
- No depende de ninguna otra capa

---

### Infrastructure
- Implementa interfaces definidas en domain/application
- Acceso a base de datos (Prisma)
- Servicios externos

---

## Inversión de dependencias

- Las capas internas NO dependen de las externas
- Se utilizan interfaces (contratos) para desacoplar

Dirección de dependencias:

Application → Interfaces → Infrastructure

Ejemplo:

LoginUseCase → IUserRepository → UserRepository (Prisma)

---

## Inyección de dependencias

- Se usa el sistema de DI de NestJS
- Las dependencias se inyectan mediante tokens

Ejemplo:

{
  provide: 'IUserRepository',
  useClass: UserRepository
}

---

## Comunicación entre módulos

- Se realiza mediante servicios internos (inyección de dependencias)
- NO se utiliza HTTP entre módulos

Ejemplo:

SalesUseCase → InventoryService

---

## Flujo clave

### Venta

1. Controller recibe request
2. Llama a SalesUseCase
3. SalesUseCase valida datos
4. Usa InventoryService
5. Inventory reduce stock

---

### Compra

1. Controller recibe request
2. Llama a PurchasesUseCase
3. Usa InventoryService
4. Inventory aumenta stock

---

## Reglas de arquitectura

- Controllers NO contienen lógica de negocio
- UseCases contienen la lógica de aplicación
- Domain define contratos e invariantes
- Infrastructure implementa detalles técnicos
- No depender de frameworks en domain

---

## Decisiones importantes

- No microservicios (por ahora)
- No event-driven architecture (por ahora)
- No sobre-ingeniería
- Arquitectura lista para escalar sin rehacer código

---

## Futuro (no implementar aún)

- Eventos de dominio
- Integración con IA (predicción, recomendaciones)
- RAG con LLM
- Sistema de roles y permisos