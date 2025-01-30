import { v2 as cloudinary } from 'cloudinary'
import config from '../config/index.js'

cloudinary.config({
	cloud_name: config.CLOUDINARY_CLOUD_NAME,
	api_key: config.CLOUDINARY_API_KEY,
	api_secret: config.CLOUDINARY_API_SECRET,
	secure: true
})

export default async function uploadToCloudinary(
	fileBuffer,
	folder = config.CLOUDINARY_BUCKET_NAME
) {
	try {
		if (!fileBuffer) {
			throw new Error('File is required for upload')
		}

		return await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder,
					resource_type: 'auto' // Automatically detect resource type
				},
				(error, uploadResult) => {
					if (error) {
						return reject(error)
					}
					return resolve(uploadResult)
				}
			)

			uploadStream.end(fileBuffer)
		})
	} catch (error) {
		throw new Error(`Cloudinary upload failed: ${error.message}`)
	}
}
