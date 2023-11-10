import express, { Application } from 'express'

const app: Application = express()

app.get('/ping', (_req, res) => {
  res.send('todo piola')
})

app.listen(3000, () => {
  console.log(`server on port ${3000}`)
})
