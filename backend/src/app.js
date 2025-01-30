import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import mediaRoutes from './routes/mediaRoutes.js'
import { healthCheck, notFound } from './utils/routes.js'
import { errorHandler } from './middlewares/error.js'
import useGoogleStrategy from './utils/passport.js'
const app = express()

app.use(express.json())
app.use(morgan('combined'))
useGoogleStrategy()

/**
 * API routes
 */
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/media', mediaRoutes)

/**
 * Other routes
 */
app.use('/health', healthCheck)
app.use('*', notFound)
app.use(errorHandler) //Must be the last middleware

export default app
