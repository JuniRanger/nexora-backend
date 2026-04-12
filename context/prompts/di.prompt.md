# Dependency Injection Prompt

Configura la inyección de dependencias en el módulo.

Requisitos:

- Registrar providers usando tokens
- Mapear interfaces a implementaciones

Ejemplo:

{
  provide: 'IUserRepository',
  useClass: UserRepository
}

Validar:

- UseCases reciben interfaces
- No se inyectan clases concretas directamente

Mantener consistencia en naming de tokens.