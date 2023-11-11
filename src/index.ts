import express, { Application } from 'express'
import { PORT } from './config'

const app: Application = express()

app.set('port', PORT !== '' ? PORT : 3000)

app.get('/ping', (_req, res) => {
  res.status(200).json({ test: 'todo piola' })
})

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
