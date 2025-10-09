import { Readable } from 'node:stream'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { InvalidFileFormatError } from './errors/invalid-file-format'

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

export async function uploadImage(
	input: UploadImageInput,
): Promise<Either<InvalidFileFormatError, { url: string }>> {
	const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

	if (!allowedContentTypes.includes(input.contentType)) {
		return makeLeft(new InvalidFileFormatError())
	}

	const { key, url } = await uploadFileToStorage({
		folder: 'images',
		fileName,
		contentType,
		contentStream,
	})

	await db.insert(schema.uploads).values({
		name: fileName,
		remoteKey: key,
		remoteUrl: url,
	})

	return makeRight({
		url,
	})
}
