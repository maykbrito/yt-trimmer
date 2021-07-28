const { exec } = require('./utils.js')

const createConcatFile = async () => {
  await exec('touch mylist.txt')
  const cmd = `for f in part*.mp4; do echo file $f >> mylist.txt; done`
  await exec(cmd)
}

module.exports = async function (content) {
  await createConcatFile()

  const ffmpegConcat = `ffmpeg -f concat -safe 0 \
  -i mylist.txt -c copy \
  -copyts final.mp4`

  console.log('CONCAT ===================')
  try {
    await exec(ffmpegConcat)
    console.log('\n\nCONCAT DONE ===================')
  } catch (err) {
    throw new Error(err)
  }
}
