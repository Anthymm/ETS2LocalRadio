import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const filePath = path.join(__dirname, 'songs', 'say it right tekkno.mp3')

app.get('/stream', (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('file not found')
  }

  res.sendFile(filePath)
})

app.listen(3000, () => {
  console.log('ETS2 radio on http://localhost:3000')
})