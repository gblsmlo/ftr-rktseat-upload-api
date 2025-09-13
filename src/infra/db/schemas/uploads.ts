import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const uploads = pgTable('uploads', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: uuid('user_id').notNull(),
	name: text('name').notNull(),
	remoteKey: text('remote_key').notNull(),
	remoteUrl: text('url').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
