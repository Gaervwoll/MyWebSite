# Personal Website — MyWebSite

The site has been migrated to **Vue.js 3 + Vite** while keeping existing behavior: animated `canvas` background, interactive particles, contacts section, and visual style.

## Stack

- Vue 3 (Composition API)
- Vite
- Docker + Docker Compose
- Nginx (for serving production build in container)

## Project structure

```
src/
  App.vue            # Main page and animation logic
  main.js            # Vue entry point
  style.css          # UI styles
docker/nginx/
  default.conf       # Nginx config with SPA fallback
Dockerfile
docker-compose.yml
```

## Local run (without Docker)

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:5173`.

## Local production preview

```bash
pnpm build
pnpm preview
```

Preview is available at `http://localhost:4173`.

## Run with Docker

```bash
docker compose up --build -d
```

The site will be available at `http://localhost:8080`.

Stop:

```bash
docker compose down
```

## Customize

- Text and contacts: `src/App.vue`.
- Colors and visual theme: `src/style.css`.
- Particle animation params (`density`, `linkDistance`, `maxVelocity`): `src/App.vue`.

## License

See `LICENSE`.
