const { exec } = require('./utils')

module.exports = async content => {
    const { stdout } = await exec(`sh ./scripts/videourl.sh ${content.youtubeUrl}`)

    content.info = { url: stdout }
}
