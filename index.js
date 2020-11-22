const robots = require('./robots');

const start = async () => {
  try {
    const content = await robots.input();
    await robots.info(content);
    await robots.download(content);
  } catch (err) {
    console.log('Error waiting for robots:\n\n ', err);
  }
};

start();