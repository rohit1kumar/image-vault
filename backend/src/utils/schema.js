import { z } from 'zod'
import config from '../config/index.js'

/**
 * Pagination schema for query parameters in URL
 */
export const paginationSchema = z.object({
	fileType: z
		.string()
		.optional()
		.transform((val) =>
			val ? config.MULTER_FILE_TYPE.includes(val) : config.MULTER_FILE_TYPE
		),
	page: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 1)), // convert string to number
	pageSize: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : config.PAGINATION_PAGE_SIZE)) // convert string to number
})
