/*
 * random.js
 */
"use strict";

exports.generate_num = function() {
  return Math.round(Math.random() * 100).toString();
};
exports.generate_sign = function() {
  return switchSign(Math.round(Math.random() * 3));
};

function switchSign(i) {
  switch (i) {
    case 0:
      return '+';
    case 1:
      return '-';
    case 2:
      return '*';
    case 3:
      return '/';
  }
}