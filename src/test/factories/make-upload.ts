import { fakerPT_BR } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeUpload(
	overrides?: Partial<InferInsertModel<typeof schema.uploads>>,
) {
	const fileName = fakerPT_BR.system.fileName()

	const result = await db
		.insert(schema.uploads)
		.values({
			name: fileName,
			remoteKey: `images/${fileName}.jpg`,
			remoteUrl: `http://example.com/${fileName}.jpg`,
			...overrides,
		})
		.returning()

	return result[0]
}
