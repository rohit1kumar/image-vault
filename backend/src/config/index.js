import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export default z
	.object({
		DATABASE_URL: z.string().url(),
		PORT: z.coerce.number().default(8000),
		JWT_SECRET: z.string().default('top-secret'),
		JWT_EXPIRES_IN: z.string().default('1d'),
		PAGINATION_PAGE_SIZE: z.coerce.number().default(10),
		// google creds
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		GOOGLE_CALLBACK_URL: z.string().url(),
		// Frotnend URL
		FRONTEND_URL: z.string().url(),
		// cloudinary
		CLOUDINARY_CLOUD_NAME: z.string(),
		CLOUDINARY_API_KEY: z.string(),
		CLOUDINARY_API_SECRET: z.string(),
		CLOUDINARY_BUCKET_NAME: z.string().default('culturex-bucket'),
		//multer file size and type
		MULTER_FILE_SIZE_LIMIT: z.coerce.number().default(10 * 1024 * 1024), // 10MB
		MULTER_FILE_TYPE: z
			.array(z.string())
			.default([
				'image/jpeg',
				'image/png',
				'image/jpg',
				'image/gif',
				'image/webp',
				'video/webm',
				'video/mp4'
			]),
		// pagination
		PAGINATION_PAGE_SIZE: z.coerce.number().default(10)
	})
	.parse(process.env)
