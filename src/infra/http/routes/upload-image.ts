import type { FastifyInstance } from "fastify";

export function uploadImageRoute(server: FastifyInstance) {
  server.post('/uploads', () => {
    return 'Hello World'
  })
}
