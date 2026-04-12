# Contract Definition Prompt

Define los contratos (interfaces) necesarios para el módulo.

Requisitos:

- Identificar dependencias del use-case
- Crear interfaces en:
  - domain/repositories (para acceso a datos)
  - application/interfaces (para servicios externos si aplica)

Reglas:

- No usar implementaciones concretas
- Interfaces deben ser claras y mínimas
- Nombrado consistente (IUserRepository, IInventoryService, etc.)

No implementar lógica, solo definir contratos.