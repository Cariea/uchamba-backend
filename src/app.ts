import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { PORT } from './config'
import { router } from './api/_routes/api'

// App Declaration
const app = express()

// Settings
app.set('port', PORT !== '' ? PORT : 3000)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) // middleware que transforma la req.body a un json

// Routes
app.use('/', router)

export default app
