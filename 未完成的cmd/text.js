"use strict";

const fs = require('fs');
const path = require('path');
const clc = require('cli-color');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.setPrompt('EXP> ');
rl.on('close', function() {
  console.log(clc.red('关闭程序中...'));
  process.exit(0);
});
var nowDir = [];
var SHOWHELP = true;
var file = [];

function outputOptions(callback) {
  if (SHOWHELP) {
    console.log(clc.blue("Options:\n ...."));
  }
  callback();
}

function outputHomepage(callback) {
  console.log(clc.red("home page:"));
  outputOptions(() => {
    rl.prompt();
    callback();
  });

}

function manageInput(input, callback) {
  //deal with input 
  //get nowDir;
  let params;
  if (input) {
    params = input.split(/\s+/);
  } else {
    params = [];
  }
  if (params.length === 1) {
    switch (params[0]) {
      case "front":
        nowDir.pop();
        return manageDir(callback);
      case "nowdir":
        console.log(nowDir);
        return callback(null);
      case "nowfile":
        console.log(file);
        return callback(null);
      default:
        return callback(Error("error params"));
    }
  } else if (params.length === 2) {
    if (params[0] === 'exit') {
      switch (params[1]) {
        case 'process':
          rl.close();
          break;
        case 'help':
          SHOWHELP = false;
          return callback(null);
        default:
          return callback(Error("error params"));
      }

    } else if (params[0] === 'open') {
      switch (params[1]) {
        case "help":
          SHOWHELP = true;
          return callback(null);
        default:
          let dir = Number.parseInt(params[1]);
          if (Number.isNaN(dir)) {
            nowDir.push(params[1]);
          } else if (dir < file.length) {
            nowDir.push(file[params[1]]);
          } else {
            return callback('error address');
          }
          return manageDir(callback);
      }
    } else {
      return callback(Error("error params"));
    }
  } else {
    return callback(Error("error params"));
  }

}

function outputPage(callback) {
  var str = nowDir.join('\\');
  console.log('当前目录: ' + str);
  file.forEach((val, index) => {
    console.log(clc.blue(index + '. ' + val));
  });
  if (callback) {
    callback(null);
  }
}

function manageDir(callback) {
  let dir = path.normalize(nowDir.join('\\'));
  fs.readdir(dir, (err, files) => {
    if (err) {
      return callback(Error('err address'));
    } else {
      if (files) {
        file = [];
      }
      (function iterator(i) {
        if (i === files.length) {
          return outputPage(callback);
        } else {
          let addr = dir + '\\' + files[i];
          fs.stat(addr, (err, stats) => {
            if (err) {
              return callback(Error("error address"));
            } else {
              if (stats.isDirectory()) {
                file.push('\\' + files[i]);
              } else {
                file.push(files[i]);
              }
            }
            iterator(i + 1);
          });
        }
      }(0));

    }

  });

}

function outputErr(err) {
  console.log(err.message);
}
module.exports = () => {
  outputHomepage(() => {
    rl.on('line', (input) => {
      rl.pause();
      manageInput(input.trim().toLowerCase(), (err) => {
        if (err) {
          outputErr(err);
          outputPage();
        }
        outputOptions(() => {
          rl.prompt();
          rl.resume();
        });
      });
    });
  });
};