import { Router } from 'express'
import passport from 'passport'
import { getCurrentUserProfile } from '../controllers/authController.js'
import { authenticateJWT } from '../middlewares/auth.js'
import config from '../config/index.js'

const router = Router()

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	(req, res) => {
		if (!req.user) {
			return res.redirect(`${config.FRONTEND_URL}/login`)
		}
		const frontendURL = `${config.FRONTEND_URL}?token=${req.user.token}`
		return res.redirect(frontendURL)
	}
)

router.get('/profile', authenticateJWT, getCurrentUserProfile)

export default router
