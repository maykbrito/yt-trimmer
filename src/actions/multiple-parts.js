const robots = require('../robots')
const data = {
  url: 'https://www.youtube.com/watch?v=gBmnB7BwSRA',
  intervals: [
    ['00:01:19', '00:01:40'],
    ['00:04:30', '00:05:00']
  ],
  concat: true
}

;(async () => {
  try {
    const content = data

    await Promise.all(
      data.intervals.map(async ([from, to], index) => {
        const part = {
          url: content.url,
          from,
          to,
          filename: `part-${index}`
        }
        await robots.download(part)

        if (content.concat) {
          content.parts = content.parts
            ? [...content.parts, part.filename]
            : [part.filename]
        }
      })
    )

    if (content.concat) {
      await robots.concat(content)
      await robots.cleaner()
    }
  } catch (err) {
    console.log('Error waiting for robots:\n\n ', err)
  }
})()
