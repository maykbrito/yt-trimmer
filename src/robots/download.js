const { exec, toSeconds } = require('./utils.js')

const filename = name =>
  name ? name.replace(/\s/g, '-').toLowerCase() : 'part'

const VIDEOQUALITY = 'bestvideo[height<=1080]+bestaudio[height<=1080]/best'

const youtubedlUrl = url => `"$(youtube-dl -f '${VIDEOQUALITY}' -g '${url}')"`

const downloadPart = async content => {
  try {
    console.log('> Starting dowload and convert')
    await exec(
      `ffmpeg -ss ${content.from} \
      -i "${youtubedlUrl(content.url)}" \
      -t ${toSeconds(content.from, content.to)} \
      -c:a aac -c:v libx264 -preset ultrafast \
      -s 1920x1080 \
      ${filename(content.filename)}.mp4`
    )
    console.log(`> Video ${content.filename} has downloaded and converted!`)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = async content => {
  await downloadPart(content)
}
