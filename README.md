# Upload Widget Server

A backend service for image uploads, built with Fastify, Zod, Drizzle ORM, and Cloudflare R2 (via AWS SDK S3). It provides a REST API to upload images and stores metadata in PostgreSQL. Documentation is available at `/docs` using Swagger UI.

## Course Attribution

This project is part of a practical lesson in the postgraduate program "Tech Developer 360" at Rocketseat. Learn more at: https://www.rocketseat.com.br/faculdade/tech-developer-360 <mcreference link="https://www.rocketseat.com.br/faculdade/tech-developer-360" index="0">0</mcreference>

## Tech Stack

- Node.js + TypeScript
- Fastify (HTTP server), @fastify/cors, @fastify/multipart
- Zod (validation)
- Swagger + Swagger UI (API documentation)
- Drizzle ORM (database access)
- PostgreSQL (via Docker Compose)
- AWS SDK S3 (Cloudflare R2 storage)
- Vitest (testing)
- Biome (lint/format)
- tsx (TypeScript runner)
- dotenv-cli (environment management)

## Requirements

- Node.js 22+
- pnpm 10+
- Docker (for PostgreSQL)

## Environment Variables

Defined and validated in <mcfile name="env.ts" path="/Users/gabs/Workspaces/l/ftr/upload-widget-server/src/env.ts"></mcfile>:

- `PORT` (default: 3333)
- `NODE_ENV` (development | test | production)
- `DATABASE_URL` (e.g., `postgresql://docker:docker@localhost:5432/upload`)
- `CLOUDFLARE_BUCKET_NAME`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ACCESS_KEY`
- `CLOUDFLARE_ACCESS_SECRET`
- `CLOUDFLARE_PUBLIC_URL`

Create a `.env` file with these variables for local development.

## Getting Started

1. Start PostgreSQL with Docker Compose:
   ```bash
   docker compose up -d
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Apply database migrations (Drizzle):
   ```bash
   pnpm db:migrate
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```
5. Open API docs (Swagger UI):
   - http://localhost:3333/docs

## API Reference

- POST `/uploads` — Upload an image (multipart/form-data)
  - Body: `file` (binary)
  - Responses:
    - 201 Created
    - 400 Validation error or invalid file format

The OpenAPI schema is served and transformed for multipart via <mcfile name="server.ts" path="/Users/gabs/Workspaces/l/ftr/upload-widget-server/src/infra/http/server.ts"></mcfile> and <mcfile name="transform-swagger-schema.ts" path="/Users/gabs/Workspaces/l/ftr/upload-widget-server/src/infra/http/transform-swagger-schema.ts"></mcfile>.

## Testing

Run the test suite:
```bash
pnpm test
```

## Placeholder Screenshot

A temporary preview image is included and will be updated soon:

![Application Preview](./docs/images/app-preview.svg)

## License

ISC (default). See the `license` field in `package.json`.