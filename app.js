//Load express module with `require` directive
var express = require('express')
var app = express()
var gpo = require('./GPO')
require('./setup');

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World')
  gporun();
})

//Launch listening server on port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!')
})

var requirejs = require('requirejs');
requirejs.config({
    paths: {
        'jquery': '../lib/jquery-1.11.3.min',
        'domReady': '../lib/require/domReady',
        'underscore': '../lib/underscore-min'
    },
    nodeRequire: require
});

var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');

var basePath = './tests';
var mocha = new Mocha();

fs.readdirSync(basePath).filter(function(file) {
    return file !== __filename && file.substr(-3) === '.js';
}).forEach(function(file) {
    mocha.addFile(path.join(basePath, file));
});

mocha.run(function(failures) {
    process.on('exit', function() {
        process.exit(failures);
    });
});