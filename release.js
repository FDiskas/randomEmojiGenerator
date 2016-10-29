var path = require('path');
var version = require('semver');
require('colors');

var dist = path.resolve(__dirname + '/dist');
var src = path.resolve(__dirname + '/src');
var args = process.argv.splice(process.execArgv.length + 2);

var fs = require('fs');
var fileName = `${src}/manifest.json`;
var file = require(fileName);

// major, minor, patch, premajor, preminor, prepatch, or prerelease.
var release = args[0] || 'patch';

file.version = version.inc(file.version, release);

fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
  if (err) return console.log(' ✘ '.black.bold.bgRed + ' ' + err.red);

  console.log(' ✔ '.black.bold.bgGreen + ` Released version: ${file.version}`.green);
});
