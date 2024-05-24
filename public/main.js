let isSelectionPlaying = false
let player, timeupdater, videotime = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtubeVideo', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) 
    return
  
  function updateTime() {
    var oldTime = videotime;
    if(player && player.getCurrentTime) {
      videotime = player.getCurrentTime();
    }
    if(videotime !== oldTime) {
      const reachStopTime = player.getCurrentTime() >= Number(inputOut.innerText)
      if (isSelectionPlaying && reachStopTime) {
        player.pauseVideo()
        isSelectionPlaying = false
      }
    }
  }
  timeupdater = setInterval(updateTime, 100);
}

const setInOut = (currentTime, field) => (field.innerText = Number(currentTime).toFixed(2))

const loadYoutubeVideo = () => {
  if (inputVideo.value === '') {
    alert('Coloque a URL do Youtube')
    return
  }

  player.loadVideoById(inputVideo.value)
}

const playSelection = () => {
  isSelectionPlaying = true
  player.seekTo(Number(inputIn.innerText))
  player.playVideo()
}

const downloadSelection = () => {
  message.style.color = 'orange'
  message.innerText = 'start converting video'

  fetch('http://localhost:3000/download', {
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
      message.style.color = 'greenyellow'
      message.innerText = 'Success!'
      youtubeVideo.src = json
      youtubeVideo.autoplay = true
      return
    }

    message.style.color = 'orangered'
    message.innerText = result
  }).catch(error => {
    message.style.color = 'orangered'
    message.innerText = 'Download error!'
  })
}

// Actions
loadVideo.onclick = () => 
  loadYoutubeVideo()
btnSetIn.onclick = () => 
  setInOut(player.getCurrentTime(), inputIn)
btnSetOut.onclick = () => 
  setInOut(player.getCurrentTime(), inputOut)
btnPlaySelection.onclick = () => 
  playSelection()
btnDownloadSelection.onclick = () => 
  downloadSelection()