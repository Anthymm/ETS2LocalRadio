import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express(),
  port = 3000

let files = fs.readdirSync('./songs')
let currentSong = {filePath: path.join(__dirname, "songs", files[0]), name: ""}
let clients: any[] = []

function readSongInfo() {
  if (!currentSong) return
  fs.readFile(currentSong.filePath)
}

function setCurrentSong(songName: string) {
  currentSong.filePath = path.join(__dirname, "songs", songName + ".mp3")
  currentSong.name = songName

  clients.forEach(res => {
    res.sendFile(currentSong.filePath)
  })
}

app.get('/api/streaming', (req, res) => {
  if (!fs.existsSync(currentSong.filePath)) {
    console.log(currentSong.filePath)
    return res.status(404).send('file not found')
  }

  if (currentSong) {
    res.sendFile(currentSong.filePath)
  }
})

app.get('/api/songs', (req, res) => {
  let tempFilesArray = []
  files.forEach(file => {
    tempFilesArray.push(file.replace('.mp3', ''))
  });
  res.send(tempFilesArray)
})

app.get('/api/currentsong', (req, res) => {
  res.send("currentSong")
})

app.post('/api/changesong', (req, res) => {
  console.log(req.headers.message)
  setCurrentSong(req.headers.message)
})


app.listen(port, () => {
  console.log(`ETS2 radio on http://localhost:${port}`)
})

//const filePath = path.join(__dirname, 'songs', 'say it right tekkno.mp3')