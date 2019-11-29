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

    socket.on('change', function(data) {
        io.emit('changed', data);
      });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });  

    io.emit('changed', generateRandom());
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var sample_json = [
    {i: 0, v: 0},
    {i: 1, v: 1},
    {i: 2, v: 2},
    {i: 3, v: 3},
    {i: 4, v: 4},
];

/* setInterval(function(){
    io.emit('changed', generateRandom());
}, 16); */

function generateRandom(){
    var arr = [];
    for (let index = 0; index < 20; index++) {
      arr.push({i: index, v: Math.floor(Math.random() * 5)})
    }
    return arr;
}