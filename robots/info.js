const util = require('util');
const getVideoInfo = util.promisify(require('youtube-dl').getInfo);


module.exports = async content => {
    content.info = await getVideoInfo(content.youtubeUrl, [])
}
