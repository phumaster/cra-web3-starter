/* eslint-disable @typescript-eslint/no-var-requires */
var fs = require('fs');
var path = require('path');
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (/node_modules|\.git|\.vscode|\.husky/im.test(file)) {
        next();
        return;
      }
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

function isPrivateKey(str) {
  return /-{3,}\n([\s\S]*?)\n-{3,}/.test(str) || /([a-f0-9]{64})+/.test(str);
}

walk('.', function (err, results) {
  if (err) {
    console.log('Error when checking files');
    process.exit(1);
  }
  for (var i = 0, len = results.length; i < len; i++) {
    try {
      console.log('Checking... ' + results[i]);
      const content = fs.readFileSync(results[i]).toString();
      if (isPrivateKey(content)) {
        console.log('ERR: The code may contain private key, please delete them.');
        process.exit(1);
      }
    } catch (e) {
      console.log('Error when checking files');
      process.exit(1);
    }
  }
});
