const fs = require('fs');

const read = (path, cb) => {
  fs.readFile(path, (err, file) => {
    if (err) {
      cb(new TypeError('Error in the path'));
    } else {
      cb(null, file);
    }
  });
};
module.exports = read;