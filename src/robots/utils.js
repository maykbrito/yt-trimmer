const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Format hh:mm:ss.ms to seconds.milliseconds
 * @param {String} start  "hh:mm:ss.ms"
 * @param {String} end "hh:mm:ss.ms"
 * @returns {String} "ss.ms"
 */
function toSeconds(start, end) {
  const [startHour, startMinutes, startSeconds] = start.split(':')
  let [startSec, startMiliseconds] = startSeconds.split('.')
  startMiliseconds = startMiliseconds || '000'

  const [endHour, endMinutes, endSeconds] = end.split(':')
  let [endSec, endMiliseconds] = endSeconds.split('.')
  endMiliseconds = endMiliseconds || '000'

  const hoursToMs = hours => Number(hours) * 60 * 60 * 1000
  const minutesToMs = minutes => Number(minutes) * 60 * 1000
  const secToMs = seconds => Number(seconds) * 1000

  const startToMs =
    hoursToMs(startHour) +
    minutesToMs(startMinutes) +
    secToMs(startSec) +
    Number(startMiliseconds)

  const endToMs =
    hoursToMs(endHour) +
    minutesToMs(endMinutes) +
    secToMs(endSec) +
    Number(endMiliseconds)

  const range = endToMs - startToMs

  const rangeToSec = Math.floor(range / 1000)
  const ms = range % 1000

  console.log('===================================')
  console.log(
    `start (${start}) - end (${end}): toSeconds: ${rangeToSec}, ms: ${ms}`
  )
  return `${rangeToSec}.${ms}` // 183.200
}

module.exports = {
  exec,
  toSeconds
}
