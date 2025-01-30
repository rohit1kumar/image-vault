import { Router } from 'express'
import { authenticateJWT } from '../middlewares/auth.js'
import multerConfig from '../utils/multer.js'
import { uploadMedia } from '../controllers/mediaController.js'
const router = Router()

router.post(
	'/upload',
	authenticateJWT,
	multerConfig.single('file'),
	uploadMedia
)

export default router
