import db from '../config/database.js'
import { media } from '../models/index.js'
import config from '../config/index.js'
import uploadToCloudinary from '../utils/cloudinary.js'
import statusCode from '../config/statusCode.js'
import { desc, eq } from 'drizzle-orm'

export const uploadMedia = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' })
		}

		const { mimetype: fileType, buffer: fileBuffer } = req.file

		if (!config.MULTER_FILE_TYPE.includes(fileType)) {
			return res.status(400).json({
				error: 'Invalid file type. Only images and videos are allowed.',
				allowedTypes: config.MULTER_FILE_TYPE
			})
		}

		// Upload to Cloudinary
		const cloudinaryResponse = await uploadToCloudinary(fileBuffer)

		// Save media file details to database
		const [mediaFile] = await db
			.insert(media)
			.values({
				fileType: fileType.split('/')[0],
				userId: req.user.userId,
				fileUrl: cloudinaryResponse.secure_url
			})
			.returning()

		return res.status(201).json({
			message: 'File uploaded successfully',
			data: mediaFile
		})
	} catch (error) {
		console.error('Upload error:', error)
		res.status(500).json({ error: 'File upload failed' })
	}
}

export const getUserMedia = async (req, res) => {
	try {
		const { fileType } = req.query
		const page = Number(req.query.page) || 1
		const pageSize = Number(req.query.pageSize) || 10
		const offset = (page - 1) * pageSize

		const userMedia = db
			.select()
			.from(media)
			.where(eq(media.userId, req.user.userId))
			.orderBy(desc(media.uploadedAt))
			.limit(pageSize)
			.offset(offset)

		if (fileType) {
			userMedia.where(eq(media.fileType, fileType))
		}

		const data = await userMedia

		return res.status(statusCode.OK).json({
			message: 'Media fetched successfully',
			data,
			meta: { ...req.query, count: data?.length }
		})
	} catch (error) {
		console.error('Fetch media error:', error)
		res.status(500).json({ error: 'Failed to fetch media' })
	}
}
