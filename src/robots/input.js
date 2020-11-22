const readline = require('readline-sync');


module.exports = () => ({
    youtubeUrl: readline.question('Youtube url: '),
    from: readline.question('Video starts in (00:00:00.00): '),
    to: readline.question('Video ends in (00:00:00.00): '),
    filename: readline.question('Nome do arquivo: (padrao: part.mp4): '),
  })