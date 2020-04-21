const util = require('util');
const exec = util.promisify(require('child_process').exec);

function toSeconds(start, end) {
    const [startHour, startMinutes, startSeconds] = start.split(":");
    const [startSec, startMiliseconds] = startSeconds.split(".");

    const [endHour, endMinutes, endSeconds] = end.split(":");
    const [endSec, endMiliseconds] = endSeconds.split(".");

    const startToSeconds =
        parseInt(startHour) * 60 + parseInt(startMinutes) * 60 + parseInt(startSec);

    const endToSeconds =
        parseInt(endHour) * 60 + parseInt(endMinutes) * 60 + parseInt(endSec);

    const miliseconds = +(parseInt(endMiliseconds) - parseInt(startMiliseconds));

    const toSeconds = +(parseInt(endToSeconds) - parseInt(startToSeconds));

    console.log("===================================");
    console.log(`start (${start}) - end (${end}): toSeconds: ${toSeconds}`);
    return `${toSeconds}.${miliseconds}`;
}

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


// const url = 'https://www.youtube.com/watch?v=OyTPNNIy3pc'

// // Optional arguments passed to youtube-dl.
// const options = [
//     '--username=user', 
//     '--password=hunter2']

// youtubedl.getInfo(url, options, async function(err, info) {
//   if (err) throw err

// //   console.log('id:', info.id)
// //   console.log('title:', info.title)
// //   console.log('url:', info.url)
// //   console.log('thumbnail:', info.thumbnail)
// //   console.log('description:', info.description)
// //   console.log('filename:', info._filename)
// //   console.log('format id:', info.format_id)

// // ffmpeg -ss 00:00:15.00 -i "OUTPUT-OF-FIRST URL" -t 00:00:10.00 -c copy out.mp4
// try {
//     const { stdout, stderr } = await exec(`ffmpeg -ss 00:00:15.00 -i "${info.url}" -to 00:00:20.00 -c copy out.mp4`)
//     console.log('stdout: ', stdout)
//     console.log('stderr: ', stderr)

// } catch (error) {
//     throw new Error(error)
// }


// // -ss parameter before the -i parameter, then it will start downloading from the time you specified with -ss. 
// // However, if you place -ss after the -i parameter, then ffmpeg will download from the very beginning of the video and start encoding from where -ss specifies.

// })



