# Deploy Guide (Render + Prisma + GitHub Actions)

Este documento describe cómo desplegar tu base de datos PostgreSQL en **Render** usando **Prisma** y automatización con **GitHub Actions**.

## Requisitos previos

1. Tener un recurso de **PostgreSQL** en Render (Database).
2. Tener tu esquema Prisma definido (`prisma/schema.prisma`) y las migraciones generadas y versionadas en `prisma/migrations/`.
3. Tener habilitado GitHub Actions para este repositorio.

## 1) Configurar la base de datos en Render

1. Ve a **Render** → **New +** → **PostgreSQL**.
2. Crea la base de datos.
3. Dentro de tu base de datos, busca las credenciales y copia **una** de estas URLs:
   - **Internal Database URL** (si tu API también vive en Render y GitHub Actions no necesita acceder por fuera)
   - **External Database URL** (si GitHub Actions necesita conectarse desde afuera, que es el caso de este workflow)

Recomendación: para el pipeline descrito abajo, usa la **External Database URL**.

4. Asegúrate de que el usuario de esa URL tenga permisos para crear/alterar tablas vía migraciones.

## 2) Configurar GitHub Secrets

1. En GitHub, abre tu repo → **Settings** → **Secrets and variables** → **Actions**.
2. Crea un nuevo secret:
   - **Name**: `DATABASE_URL`
   - **Value**: la URL copiada desde Render (idealmente la **External Database URL**).

## 3) Confirmar migraciones en el repositorio

En tu máquina (antes del primer deploy automático), asegúrate de que existen migraciones en:
- `prisma/migrations/`

Si no existen, genera al menos una migración y comitea:

```bash
npx prisma migrate dev --name init
git add prisma/migrations prisma/schema.prisma
git commit -m "chore: add prisma migrations"
git push origin main
```

## 4) Pipeline de despliegue

El archivo `.github/workflows/deploy-db.yml` se ejecuta en cada `push` a `main`:

1. `npm install`
2. `sleep 10` para dar tiempo a Render
3. `npx prisma migrate deploy` usando `secrets.DATABASE_URL`

## 5) Push final para disparar el workflow

Una vez que el secret `DATABASE_URL` esté configurado:

```bash
git add .
git commit -m "setup: database pipeline"
git push origin main
```

Luego revisa **GitHub → Actions → Deploy DB (Prisma)** para confirmar el resultado.

