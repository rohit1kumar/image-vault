import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	googleId: text('google_id').unique().notNull(),
	email: text('email').unique().notNull(),
	name: text('name'),
	profilePicture: text('profile_picture'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})
