const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

const download = require('../robots/download')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'))
})

app.post('/download', async (req, res) => {
  console.log('starting new download')
  try {
    const { inputVideo, inputIn, inputOut } = req.body
    const filename = String(Date.now()).replace('.', '').trim()
    const data = {
      url: inputVideo,
      from: inputIn,
      to: inputOut,
      filename: 'public/' + filename
    }

    await download(data)
    res.json(filename + '.mp4')
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

app.listen(3000, () => console.log('server is running'))
