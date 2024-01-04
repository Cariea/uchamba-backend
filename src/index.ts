import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { PORT } from './config'
import { router } from './api/_routes/api'
import { validatePDFFolder } from './utils/validate-pdf-folder'

// App Declaration
const app = express()

// Settings
app.set('port', PORT !== '' ? PORT : 3000)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) // middleware que transforma la req.body a un json
app.use(fileUpload({
  useTempFiles: false,
  tempFileDir: ''
}))

// Routes
app.use('/', router)

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

// Validating/Creating Upload PDF folder
validatePDFFolder()
