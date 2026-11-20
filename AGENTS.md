# AGENTS.md — «Чистая Гавань» (CRM)

Язык общения и UI — русский.

## Назначение

MVP внутренней CRM клининговой компании. Референсы: `mockups/`, бриф: `docs/design-brief.md`.
Приоритет: workflow > функции > полировка. Без website/кабинета клиента, без GraphQL,
без микросервисов/Kafka/Redis/реальных SMS-банк интеграций.

## Структура (один пакет в корне)

```
src/       NestJS: auth, health, prisma, …
web/       React CRM (Vite), без своего package.json
prisma/    schema + migrations + seed
mockups/   HTML-референсы
docs/      дизайн-бриф
```

## Стек

Node ≥ 20, NestJS 10, Prisma 6 + PostgreSQL, JWT (`aud=crm-internal`, issuer `gavan`),
class-validator, Swagger вне production (`/api/docs`), React 18 + Vite + React Router +
TanStack Query, Vitest.

## Маршруты и порты

- Префикс API: `/api`
- Dev: API `:3001`, Vite `:5173` (прокси `/api` → `:3001`)
- Production: Nest отдаёт `web/dist` + SPA fallback для не-`/api` GET
- Токен CRM: `localStorage['gavan_token']`

## Роли

`ADMIN`, `MANAGER`, `OPERATOR`, `EMPLOYEE`. Роли клиента нет.

## Barebone сейчас

- `GET /api/health`
- `POST /api/auth/login`, `GET /api/auth/me`
- Prisma: `User` + seed `admin@example.com`
- React: login + home shell

Дальше по mockups: клиенты, объекты, лиды, сделки, заказы, календарь, клинер/QR.

## Правила

- Бизнес-логика в сервисах; Prisma не в контроллерах
- Схема БД только новыми миграциями
- Endpoint'ы — DTO + guards; списки — пагинация `{data,meta}`, pageSize ≤ 100
- Секреты не коммитить; не читать/печатать `.env`
- После существенных изменений — `npm run build && npm run lint && npm run test`
