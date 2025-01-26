import express from 'express'
import morgan from 'morgan'
// import authRoutes from './routes/authRoutes.js'
import { healthCheck, notFound } from './utils/routes.js'
import { errorHandler } from './middlewares/error.js'

const app = express()

app.use(express.json())
app.use(morgan('combined'))

/**
 * API routes
 */
// app.use('/api/v1/auth', authRoutes)

/**
 * Other routes
 */
app.use('/health', healthCheck)
app.use('*', notFound)
app.use(errorHandler) //Must be the last middleware

export default app
