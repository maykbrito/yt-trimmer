const { exec, toSeconds, grabRange } = require('./utils.js')

const createFilename = name =>
  name ? name.replace(/\s/g, '-').toLowerCase() : 'part'

const VIDEOQUALITY = 'bestvideo[height<=1080]+bestaudio[height<=1080]/best'

const youtubedlUrl = url => `"$(youtube-dl -f '${VIDEOQUALITY}' -g '${url}')"`

/**
 * Function that download partial video content from given Youtube URL
 *
 * @param {Object} content
 * @param {String} content.url - Youtube URL
 * @param {String} content.from - time as 00:00:00 or miliseconds
 * @param {String} content.to - time as 00:00:00 or miliseconds
 * @param {String} content.filename
 * @returns {Promise}
 * @example
 * await downloadPart({
 * url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 * from: '00:00:00',
 * to: '00:00:10',
 * filename: 'video.mp4'
 * })
 */
const downloadPart = async ({ url, from, to, filename }) => {
  const ss = from
  const t = String(to).includes(':') ? toSeconds(from, to) : grabRange(to, from)
  const outputFilename = createFilename(filename)
  try {
    console.log('> Dowloading and converting')
    await exec(
      `ffmpeg -ss ${ss} \
      -i "${youtubedlUrl(url)}" \
      -t ${t} \
      -c:a aac -c:v libx264 -preset ultrafast \
      -s 1920x1080 \
      public/video/${outputFilename}.mp4`
    )
    console.log(`> Video public/video/${outputFilename} has downloaded and converted!`)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = downloadPart
