import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { uploadImage } from '@/app/functions/upload-image'
import { isRight, unwrapEither } from '@/shared/either'
export const uploadImageRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/uploads',
		{
			schema: {
				summary: 'Upload an image',
				tags: ['uploads'],
				consumes: ['multipart/form-data'],
				response: {
					201: z.object({ uploadId: z.uuid() }),
					400: z.object({ message: z.string(), issues: z.any().optional() }),
				},
			},
		},
		async (request, reply) => {
			const uploadIdFile = await request.file({
				limits: {
					fileSize: 1024 * 1024 * 2, // 2MB
				},
			})

			if (!uploadIdFile) {
				return reply.status(400).send({ message: 'No file uploaded' })
			}

			const result = await uploadImage({
				fileName: uploadIdFile.filename,
				contentType: uploadIdFile.mimetype,
				contentStream: uploadIdFile.file,
			})

			if (uploadIdFile.file.truncated) {
				return reply.status(400).send({
					message: 'File size exceeds the limit of 2MB',
				})
			}

			if (isRight(result)) {
				console.log(unwrapEither(result))

				return reply.status(201).send()
			}

			const error = unwrapEither(result)

			switch (error.constructor.name) {
				case 'InvalidFileFormatError':
					return reply.status(400).send({
						message: error.message,
					})
			}
			// return reply.status(400).send({ message: result.value.message })
		},
	)
}
