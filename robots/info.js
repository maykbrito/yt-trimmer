const { exec } = require('./utils')

module.exports = async content => {
    const { stdout } = await exec(`sh ./videourl.sh ${content.youtubeUrl}`)

    content.info = { url: stdout }
}
