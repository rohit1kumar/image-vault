import { Router } from 'express'
import { authenticateJWT } from '../middlewares/auth.js'
import multerConfig from '../utils/multer.js'
import { getUserMedia, uploadMedia } from '../controllers/mediaController.js'
import { validateQuerySchema, validateSchema } from '../middlewares/validate.js'
import { paginationSchema } from '../utils/schema.js'
const router = Router()

router.post(
	'/upload',
	authenticateJWT,
	multerConfig.single('file'),
	uploadMedia
)

router.get(
	'/',
	validateQuerySchema(paginationSchema),
	authenticateJWT,
	getUserMedia
)
export default router
