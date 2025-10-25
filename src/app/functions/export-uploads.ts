import { stringify } from 'csv-stringify'
import { ilike } from 'drizzle-orm'
import { PassThrough, Transform } from 'stream'
import { pipeline } from 'stream/promises'
import z from 'zod'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { type Either, makeRight } from '@/shared/either'

const exportUploadInput = z.object({
	searchQuery: z.string().optional(),
})

type ExportUploadsInput = z.input<typeof exportUploadInput>

type ExportUploadsOutput = {
	reportUrl: string
}

export async function exportUploads(
	input: ExportUploadsInput,
): Promise<Either<never, ExportUploadsOutput>> {
	const { searchQuery } = exportUploadInput.parse(input)

	const { sql, params } = db
		.select({
			id: schema.uploads.id,
			name: schema.uploads.name,
			remoteUrl: schema.uploads.remoteUrl,
			createdAt: schema.uploads.createdAt,
		})
		.from(schema.uploads)
		.where(
			searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined,
		)
		.toSQL()

	const cursor = pg.unsafe(sql, params as string[]).cursor(1)

	const csv = stringify({
		delimiter: ',',
		header: true,
		columns: [
			{ key: 'id', header: 'ID' },
			{ key: 'name', header: 'Name' },
			{ key: 'remote_url', header: 'URL' },
			{ key: 'created_at', header: 'Created At' },
		],
	})

	const uploadToStorageStream = new PassThrough()

	// No blocking await here to allow streaming
	const uploadToStorage = uploadFileToStorage({
		contentType: 'text/csv',
		folder: 'downloads',
		fileName: `${new Date().toISOString()}-uploads-report.csv`,
		contentStream: uploadToStorageStream,
	})

	// No blocking await here to allow streaming
	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chucks: unknown[], _, callback) {
				for (const chuck of chucks) {
					this.push(chuck)
				}
				callback()
			},
		}),
		csv,
		uploadToStorageStream,
	)

	// Resolve both promises
	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

	return makeRight({
		reportUrl: url,
	})
}
