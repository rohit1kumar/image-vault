import db from '../config/database.js'
import { media } from '../models/index.js'
import config from '../config/index.js'
import uploadToCloudinary from '../utils/cloudinary.js'

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
				fileType,
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
		// Fetch media files for the authenticated user
		const userMedia = await db
			.select()
			.from(media)
			.where(eq(media.userId, req.user.id))
			.orderBy(desc(media.uploadedAt))

		res.json(userMedia)
	} catch (error) {
		console.error('Fetch media error:', error)
		res.status(500).json({ error: 'Failed to fetch media' })
	}
}
