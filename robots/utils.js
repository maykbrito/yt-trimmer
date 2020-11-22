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

    const miliseconds = Math.abs(parseInt(endMiliseconds) - parseInt(startMiliseconds));

    const toSeconds = +(parseInt(endToSeconds) - parseInt(startToSeconds));

    console.log("===================================");
    console.log(`start (${start}) - end (${end}): toSeconds: ${toSeconds}.${miliseconds}`);
    return `${toSeconds}.${miliseconds}`;
}


module.exports = {
    exec,
    toSeconds,
}