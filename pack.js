var chromeExe = require('chrome-location');
var fs = require("fs");
var path = require('path');
var fsex = require('fs-extra');
var archiver = require('archiver');
var colors = require('colors');
var prettyBytes = require('pretty-bytes');

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
    var extension = require(fileName);


    // Zip dir
    var output = fs.createWriteStream(`${dist}/${extension.name}.zip`);
    var archive = archiver.create('zip', {});

    archive.pipe(output);
    archive.bulk([
      {
        expand: true,
        cwd: src,
        src: ["**/*"],
        dot: false
      }
    ]);
    archive.finalize();

    archive.on('error', function(err) {
      return console.log(' ✘ '.black.bold.bgRed + `  ${err}`.red);
    });

    output.on('close', function() {

      fsex.remove(src, function (err) {
        if (err) {
          return console.log(' ✘ '.black.bold.bgRed + ' ' + err.red);
        }

        console.log(' ✔ '.black.bold.bgGreen + ` Build success. Released version:${extension.version} Zip size:${prettyBytes(archive.pointer())}`.green);
      })

    });

  }
});
