var chromeExe = require('chrome-location');
var fs = require('fs-extra');
var path = require('path');
require('colors');

// http://nodejs.org/api.html#_child_processes
var exec = require('child_process').exec;

var dist = path.resolve(__dirname + '/dist');
var src = path.resolve(__dirname + '/dist/src');

// chromeExe --pack-extension=C:\myext --pack-extension-key=C:\myext.pem
var command = `${chromeExe} --pack-extension=${src}`;

// executes `pwd`
child = exec(command, function (error) {
  if (error !== null) {
    console.error('exec error: ' + error);
  }
  else {
    var fileName = `${src}/manifest.json`;
    var file = require(fileName);

    fs.remove(src, function (err) {
      if (err) {
        return console.log(' ✘ '.black.bold.bgRed + ' ' + err.red);
      }
      console.log(' ✔ '.black.bold.bgGreen + ` Build success. Released version: ${file.version}`.green);
    })
  }
});
