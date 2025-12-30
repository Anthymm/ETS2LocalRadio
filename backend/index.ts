import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express(),
  port = 3000

let files = fs.readdirSync('./songs')
let currentSong = {filePath: "", name: ""}

function readSongInfo() {
  if (!currentSong) return
  fs.readFile(currentSong.filePath)
}

function setCurrentSong(newFilePath: string, newName: string) {
  currentSong.filePath = newFilePath
  currentSong.name = newName
}

app.get('/api/streaming', (req, res) => {
  if (!fs.existsSync(currentSong.filePath)) {
    return res.status(404).send('file not found')
  }

  if (currentSong) {
    res.sendFile(currentSong.filePath)
  }
})

app.get('/api/songs', (req, res) => {
  res.send(files)
})

app.get('/api/currentsong', (req, res) => {
  res.send("currentSong")
})

app.listen(port, () => {
  console.log(`ETS2 radio on http://localhost:${port}`)
})

//const filePath = path.join(__dirname, 'songs', 'say it right tekkno.mp3')