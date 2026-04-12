# Debug Prompt

Analiza el siguiente código en el contexto de Nexora ERP.

Detecta:

- Violaciones de Clean Architecture
- Uso incorrecto de dependencias
- Dependencia de implementaciones concretas
- Lógica en controllers
- Uso incorrecto de Prisma
- Problemas en inyección de dependencias

Para cada problema:

1. Explica por qué es incorrecto
2. Propón la solución
3. Refactoriza el código

Reglas:

- Basarse en los archivos de /context
- Mantener simplicidad (MVP)
- No agregar complejidad innecesaria