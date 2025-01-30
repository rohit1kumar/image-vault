import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import config from '../config/index.js'
import db from '../config/database.js'
import { users } from '../models/index.js'
import { eq } from 'drizzle-orm'
import { generateToken } from './token.js'

export default function useGoogleStrategy() {
	passport.use(
		new GoogleStrategy(
			{
				clientID: config.GOOGLE_CLIENT_ID,
				clientSecret: config.GOOGLE_CLIENT_SECRET,
				callbackURL: config.GOOGLE_CALLBACK_URL
			},
			async function (accessToken, refreshToken, profile, cb) {
				try {
					const { name, sub, picture, email } = profile._json

					let [user] = await db
						.select()
						.from(users)
						.where(eq(users.email, email))
						.limit(1)
					if (!user) {
						;[user] = await db
							.insert(users)
							.values({
								email,
								name,
								googleId: sub,
								profilePicture: picture
							})
							.returning()
					}
					const token = generateToken({ userId: user.id })
					return cb(null, { token, user })
				} catch (error) {
					console.error('Google authentication error:', error)
					return cb(error)
				}
			}
		)
	)
	passport.serializeUser(function (user, cb) {
		cb(null, user)
	})

	passport.deserializeUser(function (user, cb) {
		cb(null, user)
	})
}
