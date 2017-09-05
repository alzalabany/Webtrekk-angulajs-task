var express = require('express'),
    fs = require('fs'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path'),
    readJson = require('read-package-json'),
    compression = require('compression'); //gzip resplose



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

app.use(express.static(__dirname + '/src', { redirect: false }));

app.get('*', function(req, res) {
  console.log('returning')
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

readJson(path.join(__dirname+'/package.json'), console.error, false, function (er, data) {
  if (er) {
    console.error("There was an error reading the "+path.join(__dirname+'../package.json')+" file")
    console(er);
    exit(0);
    return;
  }

  // building app files;

  // app.listen(8080);
  http.listen(8080, function(){
    console.log(data.name+' version:'+data.version+' is running on 8080');
  });
  io.on('connection', function(socket){
    console.log('a user connected');
  });
 });

const build = require('./build');
fs.watch('./src', { encoding: 'utf8' }, (eventType, filename) => {
  if (filename && filename.indexOf('_')!==0) {
    console.log(filename);
    build(true);
    io.emit('reload_please', { for: 'everyone' });
  }
});