const { exec } = require('./utils.js')

module.exports = async function () {
  const cmd = `find . -type f -iname "part*.mp4" | xargs rm`
  await exec(cmd)
  await exec('rm mylist.txt')
}
