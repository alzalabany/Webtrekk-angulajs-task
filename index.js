/* eslint-disable */
var express = require('express'),
    fs = require('fs'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    chokidar = require('chokidar'),
    readJson = require('read-package-json'),
    compression = require('compression'); //gzip resplose
var __DEV__ = process.env.NODE_ENV !== 'production';
var build = require('./build');

console.log('Starting in '+process.env.NODE_ENV+' mode');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());



app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public', { redirect: false }));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

if(!__DEV__){
  app.listen(8080);
  build(false, true);
  return console.log('running on 8080 in production mode');
  // dont continue..
}

readJson(path.join(__dirname+'/package.json'), console.error, false, function (er, data) {
  if (er) {
    console.error("There was an error reading the "+path.join(__dirname+'../package.json')+" file")
    console(er);
    exit(0);
    return;
  }
    var http = require('http').Server(app),
    io = require('socket.io')(http);
    http.listen(8080, function(){
      console.log(data.name+' version:'+data.version+' is running on 8080');
    });
    io.on('connection', function(socket){
      console.log('a user connected');
    });
    chokidar.watch('./src', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
      console.log('C:detected a change on +', path);
      console.log(event, path);
      build(true);
      io.emit('reload_please', { for: 'everyone' });
    });
    fs.watch('./src', { encoding: 'utf8' }, (eventType, filename) => {
      console.log('detected a change on +', filename);
      build(true);
      io.emit('reload_please', { for: 'everyone' });
    });
 });


/* eslint-enable */