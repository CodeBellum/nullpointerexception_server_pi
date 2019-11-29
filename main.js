var express = require('express');
var app = express();

var pug = require('pug');

app.set('views','views');
app.set('view engine','pug');
app.use(express.static('public'));

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res){
    res.send(pug.renderFile('./views/index.pug'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });  
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});