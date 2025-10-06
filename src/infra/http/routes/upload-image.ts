import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { uploadImage } from '@/app/functions/upload-image'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
export const uploadImageRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/uploads',
		{
			schema: {
				summary: 'Upload an image',
				consumes: ['multipart/form-data'],
				response: {
					201: z.object({ uploadId: z.uuid() }),
					400: z.object({ message: z.string(), issues: z.any().optional() }),
				},
			},
		},
		async (request, reply) => {
			await db.insert(schema.uploads).values({
				name: 'test.jpg',
				remoteKey: 'https://example.com/test.jpg',
				remoteUrl: 'https://example.com/test.jpg',
			})

			const uploadIdFile = await request.file({
				limits: {
					fileSize: 1024 * 1024 * 2, // 2MB
				},
			})

			if (!uploadIdFile) {
				return reply.status(400).send({ message: 'No file uploaded' })
			}

			await uploadImage({
				fileName: uploadIdFile.filename,
				contentType: uploadIdFile.mimetype,
				contentStream: uploadIdFile.file,
			})

			return reply.status(201).send({ uploadId: '123' })
		},
	)
}
