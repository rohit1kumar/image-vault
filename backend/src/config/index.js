import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export default z
	.object({
		DATABASE_URL: z.string().url(),
		PORT: z.coerce.number().default(8000),
		JWT_SECRET: z.string().default('top-secret'),
		JWT_EXPIRES_IN: z.string().default('1d'),
		PAGINATION_PAGE_SIZE: z.coerce.number().default(10)
	})
	.parse(process.env)
