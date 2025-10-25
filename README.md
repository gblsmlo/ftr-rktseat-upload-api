# Upload Widget Server

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.x-000000?style=for-the-badge&logo=fastify)](https://fastify.dev/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Vitest](https://img.shields.io/badge/Vitest-1.x-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![Biome](https://img.shields.io/badge/Biome-1.x-60A5FA?style=for-the-badge&logo=biome)](https://biomejs.dev/)

</div>
A backend service for image uploads, built with Fastify, Zod, Drizzle ORM, and Cloudflare R2 (via AWS SDK S3). It provides a REST API to upload images and stores metadata in PostgreSQL. Documentation is available at `/docs` using Swagger UI.
<img width="1480" height="842" alt="Screenshot 2025-10-25 at 19 26 55" src="https://github.com/user-attachments/assets/34cf3b2b-f081-4722-85bf-45c1b9b22743" />

## ✨ Tech Stack

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/) (HTTP server)
- [Zod](https://zod.dev/) (Validation)
- [Swagger](https://swagger.io/) + [Swagger UI](https://swagger.io/tools/swagger-ui/) (API Documentation)
- [Drizzle ORM](https://orm.drizzle.team/) (Database ORM)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) via [AWS SDK S3](https://aws.amazon.com/sdk-for-javascript/)
- [Vitest](https://vitest.dev/) (Testing)
- [Biome](https://biomejs.dev/) (Linter & Formatter)

## ✅ Requirements

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+
- [Docker](https://www.docker.com/) (for PostgreSQL)

## 📦 Environment Variables

Defined and validated in `src/env.ts`:

- `PORT` (default: 3333)
- `NODE_ENV` (development | test | production)
- `DATABASE_URL` (e.g., `postgresql://docker:docker@localhost:5432/upload`)
- `CLOUDFLARE_BUCKET_NAME`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ACCESS_KEY`
- `CLOUDFLARE_ACCESS_SECRET`
- `CLOUDFLARE_PUBLIC_URL`

Create a `.env` file with these variables for local development.

## 🚀 Getting Started

1.  **Start PostgreSQL with Docker Compose:**
    ```bash
    docker compose up -d
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Apply database migrations (Drizzle):**
    ```bash
    pnpm db:migrate
    ```
4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
5.  **Open API docs (Swagger UI):**
    - http://localhost:3333/docs

## 📚 API Reference

- `POST /uploads`: Upload an image (multipart/form-data).
- `GET /uploads`: Get a list of all uploads.
- `POST /uploads/exports`: Export uploads as a CSV file.

The OpenAPI schema is served and transformed for multipart via `src/infra/http/server.ts` and `src/infra/http/transform-swagger-schema.ts`.

## 🧪 Testing

Run the test suite:
```bash
pnpm test
```

## 🎓 Course Attribution

This project is part of a practical lesson in the postgraduate program "Tech Developer 360" at Rocketseat. Learn more at: https://www.rocketseat.com.br/faculdade/tech-developer-360

## 📄 License

ISC (default). See the `license` field in `package.json`.
