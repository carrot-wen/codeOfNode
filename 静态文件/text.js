"use strict";

var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname;
  if (pathname === '/') {
    pathname = 'index.html';
  }
  var extname = path.extname(pathname);
  fs.readFile(path.normalize('./static/' + pathname), function(err, data) {
    //如果不能打开这个网页
    if (err) {
      fs.readFile('404.html', function(err, data) {
        //如果不能打开404网页
        if (err) {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.end("404:无法打开这个网页");
        } else {
          //返回404网页
          res.writeHead(200, { "Content-type": "text/html" });
          res.end(data);
        }
      });
    } else {
      //返回网页
      var mime = getMime(extname);
      console.log(":    " + mime);
      res.writeHead(200, { "Content-type": mime });
      res.end(data);
    }
  });
});

server.listen(3000, "127.0.0.1");

function getMime(extname) {
  switch (extname) {
    case ".html":
      return "text/html";
    case ".jpg":
      return "image/jpeg";
    case ".txt":
      return "text/plain";
  }
}