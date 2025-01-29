import { users } from '../models/index.js'
import db from '../config/database.js'
import { eq } from 'drizzle-orm'

export const getCurrentUserProfile = async (req, res, next) => {
	try {
		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.id, req.user.userId))
			.limit(1)
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}
		return res.status(200).json(user)
	} catch (error) {
		next(error)
	}
}
