import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.js'

export const mediaFiles = pgTable(
	'media_files',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		fileName: text('file_name').notNull(),
		fileType: text('file_type').notNull(),
		fileUrl: text('file_url').notNull(),
		uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
		userId: uuid('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull()
	},
	(table) => [index('user_id_idx').on(table.userId)]
)
