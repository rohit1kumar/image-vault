import statusCode from '../config/statusCode.js'

/**
 * Generic validator function for request data
 */
const validate = (schema, source) => async (req, res, next) => {
	try {
		await schema.parseAsync(req[source])
		next()
	} catch (error) {
		return res.status(statusCode.BAD_REQUEST).json({
			message: 'Validation failed',
			errors: error.errors
		})
	}
}

/**
 * Validate request body against a zod schema
 */
export const validateSchema = (schema) => validate(schema, 'body')

/**
 * Validate query parameters against a zod schema
 */
export const validateQuerySchema = (schema) => validate(schema, 'query')
