const {exec, toSeconds} = require('./utils.js')

const filename = name => name ? name.replace(/\s/g, "-").toLowerCase() : "part"

const downloadPart = async content => {
    try {
        console.log("> Starting dowload and convert")
        await exec(`ffmpeg -ss ${content.from} -i "${content.info.url}" -t ${toSeconds(content.from, content.to)} -c copy ${filename(content.filename)}.mp4`)
        console.log("> Video has downloaded and converted!")
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = async content => {
    await downloadPart(content)
}