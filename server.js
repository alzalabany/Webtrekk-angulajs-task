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
var webtrekk = require('./webtrekk_build');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

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
  app.listen(port);
  webtrekk.build(false); // rebuild all..
  return console.log('running on '+port+' in production mode');
  // dont continue..
}

// send hotreload order to socket.io client
function reloadIO(emitter){
  console.log('triggering reload');
  emitter.emit('reload_please');
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
    http.listen(port, function(){
      console.log(data.name+' version:'+data.version+' is running on '+port);
    });
    io.on('connection', function(socket){
      console.log('a user connected');
    });
    chokidar.watch('./src').on('all', (event, path) => {
      if(event==='add')return;
      let ext = path.split('.').pop();
      // console.log(ext+':detected a change on +', path);
      switch (ext) {
        case 'css':
        console.log('updating css');
          return webtrekk.updateAppCss().then(r=>{
            if(r.css)
              io.emit('reload_css', r.css);
            else
              reloadIO(io)
          }).catch(reloadIO)
          break;
        case 'js':
        case 'html':
          console.log('updating app.js');
          webtrekk.updateAppJsAndHtml();
          break;
        default:
          return;
      }
      reloadIO(io);
    });
 });


/* eslint-enable */