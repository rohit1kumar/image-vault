import statusCode from '../config/statusCode.js'
import multer from 'multer'

export const errorHandler = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		console.log('err', err)

		return res.status(statusCode.BAD_REQUEST).json({
			message: err.message
		})
	}
	return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
		message: 'An unexpected error occurred. Please try again later.'
	})
}
