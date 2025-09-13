import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/uploads',
		{
			schema: {
				summary: 'Upload an image',
				tags: ['Uploads'],
				body: z.object({
					file: z.instanceof(Buffer).refine((file) => file.byteLength > 0, {
						message: 'File is required',
					}),
				}),
				response: {
					201: z.object({ uploadId: z.uuid() }),
					400: z.object({ message: z.string(), issues: z.any().optional() }),
					500: z.object({ message: z.string() }),
				},
			},
		},
		async (_request) => {
			return { uploadId: crypto.randomUUID() }
		},
	)
}
