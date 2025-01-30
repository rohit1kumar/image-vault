import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import users from './users.js'

export default pgTable(
	'media_files',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		fileType: text('file_type').notNull(),
		fileUrl: text('file_url').notNull(),
		uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
		userId: uuid('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull()
	},
	(table) => [index('user_id_idx').on(table.userId)]
)
