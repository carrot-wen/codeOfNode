"use strict";
var readline = require('readline');
var random = require('./random.js');

var a, b, c, sign_a, sign_b, summary;
var rl = readline.createInterface(
  process.stdin,
  process.stdout
);
rl.setPrompt('Calculate> ');

exports.begin = function() {
  rl.prompt();
  assign();
  summary = cal();
  rl.on('line', function(line) {
    if (line.trim() === summary.toString()) {
      console.log('answer is right!');
    } else {
      console.log("answer is error! the correct answer is " + summary + '.');
    }
    rl.prompt();
    assign();
    summary = cal();
  }).on('close', function() {
    console.log('Calculate exits!');
    process.exit(0);
  });
};

var assign = () => {
  a = random.generate_num();
  b = random.generate_num();
  c = random.generate_num();
  sign_a = random.generate_sign();
  sign_b = random.generate_sign();
};

function cal() {
  var s = a + sign_a + b + sign_b + c;
  var result = eval(s);
  console.log(s);
  return result;
}