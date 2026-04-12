# Nexora ERP - Modules

## Auth

Responsabilidad:
- Autenticación de usuarios

Estado actual:
- Login falso (mock)

Endpoints:
- POST /auth/login

Entrada:
- email
- password

Salida:
- access_token (string fake)

Notas:
- No usar base de datos aún
- No implementar seguridad real todavía

---

## Inventory

Responsabilidad:
- Gestión de productos
- Control de stock

Endpoints:
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

Funciones internas:
- aumentarStock(productId, cantidad)
- reducirStock(productId, cantidad)

Reglas:
- No permitir stock negativo
- Validar precio > 0

---

## Sales

Responsabilidad:
- Registro de ventas

Entidad:
- Sale (no persistente aún o básica)

Endpoints:
- POST /sales
- GET /sales
- GET /sales/:id

Entrada (POST):
- productId
- cantidad

Lógica:
- Validar que el producto existe
- Validar que hay stock suficiente
- Reducir stock usando InventoryService

Reglas:
- No permitir ventas sin stock
- No editar ventas (inmutables)

Notas:
- DELETE opcional (solo para demo)
- No implementar update (anti-patrón en ventas)

---

## Purchases

Responsabilidad:
- Registro de compras

Entidad:
- Purchase (básica)

Endpoints:
- POST /purchases
- GET /purchases
- GET /purchases/:id

Entrada (POST):
- productId
- cantidad

Lógica:
- Validar que el producto existe
- Aumentar stock usando InventoryService

Reglas:
- No permitir cantidades negativas
- No editar compras (mantener historial)

Notas:
- DELETE opcional para MVP
- No update

---

## Accounting

Responsabilidad:
- Registro de ingresos y egresos

Entidades:
- Income
- Expense

Endpoints:

Ingresos:
- POST /accounting/income
- GET /accounting/income
- GET /accounting/income/:id

Egresos:
- POST /accounting/expense
- GET /accounting/expense
- GET /accounting/expense/:id

Entrada:
- monto
- descripcion

Lógica:
- Registrar movimiento financiero

Reglas:
- monto > 0
- No permitir edición (histórico)

Notas:
- No integración aún con Sales/Purchases
- No cálculos complejos (MVP)