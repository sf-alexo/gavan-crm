# Гавань — CRM (NestJS + React)

Один пакет в корне репозитория:

- `src/` — NestJS API (Prisma + PostgreSQL, JWT, REST)
- `web/` — React + Vite CRM UI
- `prisma/` — схема и миграции
- `mockups/` — HTML-референсы экранов
- `docs/` — дизайн-бриф

Стек: Node ≥ 20, NestJS, Prisma, PostgreSQL, React, Vite, TanStack Query. Без GraphQL, без отдельного website.

## Быстрый старт

```bash
npm install
cp .env.example .env
# DATABASE_URL, JWT_SECRET (>=32), SEED_ADMIN_PASSWORD

npm run db:migrate
npm run db:seed
npm run dev
```

- API: http://localhost:3001/api  
- CRM UI: http://localhost:5173  
- Swagger: http://localhost:3001/api/docs  

Демо: `admin@example.com` / значение `SEED_ADMIN_PASSWORD`.

## Команды

```bash
npm run build
npm run start:prod   # API + web/dist
npm run lint
npm run test
npm run test:web
npm run db:migrate:dev
```
