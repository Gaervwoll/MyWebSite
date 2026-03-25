# Личный сайт — MyWebSite

Сайт перенесён на **Vue.js 3 + Vite** с сохранением текущего функционала: анимированный фон на `canvas`, интерактивные частицы, секция контактов и стили.

## Технологии

- Vue 3 (Composition API)
- Vite
- Docker + Docker Compose
- Nginx (для продакшен-сборки в контейнере)

## Структура проекта

```
src/
  App.vue            # Главная страница и логика анимации
  main.js            # Точка входа Vue
  style.css          # Стили интерфейса
docker/nginx/
  default.conf       # Конфиг nginx с fallback для SPA
Dockerfile
docker-compose.yml
```

## Локальный запуск (без Docker)

```bash
pnpm install
pnpm dev
```

После запуска откройте `http://localhost:5173`.

## Продакшен-сборка локально

```bash
pnpm build
pnpm preview
```

Preview будет доступен на `http://localhost:4173`.

## Запуск через Docker

```bash
docker compose up --build -d
```

Сайт будет доступен на `http://localhost:8080`.

Остановка:

```bash
docker compose down
```

## Настройка под вас

- Контакты и текст: `src/App.vue`.
- Цвета и визуальные параметры: `src/style.css`.
- Параметры анимации частиц (`density`, `linkDistance`, `maxVelocity`): `src/App.vue`.

## Лицензия

Смотрите файл `LICENSE`.
