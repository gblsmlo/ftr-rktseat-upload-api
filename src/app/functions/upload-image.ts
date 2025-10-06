import { Readable } from 'node:stream'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const uploadImageInput = z.object({
	fileName: z.string(),
	contentType: z.string(),
	contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

const allowedContentTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
]

export async function uploadImage(input: UploadImageInput) {
	const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

	if (!allowedContentTypes.includes(input.contentType)) {
		throw new Error('Invalid content type')
	}

	const _upload = await db.insert(schema.uploads).values({
		name: fileName,
		remoteKey: fileName,
		remoteUrl: 'http://asdasd.com',
	})
}
