const path = require("path");
const fs = require("fs");

// clear entire folder
exports.clearFolder = (directory) => {
    console.log('Directory', directory)
  if (directory) {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  } else return
};
