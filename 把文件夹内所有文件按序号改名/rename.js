'use strict';
var fs = require('fs');
var path = require('path');



/*folderURL <string> | <Buffer> | <URL>
 * callback <function>
 * 给一个文件夹内的所有文件改名
 */
exports.renameOfAll = function(folderURL, callback) {
  fs.readdir(folderURL, function(err, files) {
    if (err) {
      callback(err);
    } else {
      (function iterator(i) {
        if (i === files.length) {
          return;
        } else {
          let extname = path.extname(files[i]);
          let oldURL = path.normalize(folderURL + '/' + files[i]);
          let newURL = path.normalize(folderURL + '/' + i + extname);
          fs.stat(oldURL, function(err, stats) {
            if (err) {
              throw err;
            } else {
              if (stats.isFile()) {
                fs.rename(oldURL, newURL, function(err) {
                  if (err) {
                    throw err;
                  }
                });
              }
            }
          });
          iterator(i + 1);
        }
      }(0));
      callback(null);
    }
  });
};