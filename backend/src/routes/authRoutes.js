import { Router } from 'express'
import passport from 'passport'
import { getCurrentUserProfile } from '../controllers/authController.js'
import { authenticateJWT } from '../middlewares/auth.js'

const router = Router()

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	(req, res) => res.json({ ...req.user })
)

router.get('/profile', authenticateJWT, getCurrentUserProfile)

export default router
