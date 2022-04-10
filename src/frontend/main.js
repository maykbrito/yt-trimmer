import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader'

import './style.scss'

const setInOut = (currentTime, field) => (field.innerText = currentTime)

function loadYoutubeVideo() {
  if (inputVideo.value === '') {
    alert('Coloque a URL do Youtube')
    return
  }

  youtubeVideo.setAttribute('data-yt', inputVideo.value)

  new YouTubeToHtml5({
    selector: '.youtube-video',
    attribute: 'data-yt',
    withAudio: true
  })

  youtubeVideo.addEventListener('timeupdate', () => {
    const reachStopTime = youtubeVideo.currentTime >= Number(inputOut.innerText)
    if (isSelectionPlaying && reachStopTime) {
      youtubeVideo.pause()
      isSelectionPlaying = false
    }
  })
}

loadVideo.onclick = () => loadYoutubeVideo()

window.addEventListener('keydown', ({ key }) => {
  if (key === 'i') {
    setInOut(youtubeVideo.currentTime, inputIn)
  }
  if (key === 'o') {
    setInOut(youtubeVideo.currentTime, inputOut)
  }
  if (key === 'p') {
    playSelection()
  }
  if (key === 'd') {
    downloadSelection()
  }
})

let isSelectionPlaying = false

function playSelection() {
  isSelectionPlaying = true
  youtubeVideo.currentTime = Number(inputIn.innerText)
  youtubeVideo.play()
}

function downloadSelection() {
  message.style.color = 'orange'
  message.innerText = 'start converting video'

  fetch('/download', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputIn: Number(inputIn.innerText),
      inputOut: Number(inputOut.innerText),
      inputVideo: inputVideo.value
    })
  })
    .then(response => response.json())
    .then(json => {
      if (json.includes('.mp4')) {
        message.style.color = 'green'
        message.innerText = 'Success!'
        youtubeVideo.src = `video/${json}`
        youtubeVideo.autoplay = true
        download.innerHTML = `
          <a href="/download/${json}">
            <button style="color: #191624"><strong>DOWNLOAD</strong></button>
          </a>
        `
        return
      }

      message.style.color = 'red'
      message.innerText = result
    })
}
