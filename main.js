var express = require('express');
var app = express();
const { exec } = require('child_process');
var pug = require('pug');

app.set('views','views');
app.set('view engine','pug');
app.use(express.static('public'));

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var insToPort = [
  { i: 0, ports: [1,3,15,19] },
  { i: 1, ports: [0,4,16,18] },
  { i: 2, ports: [2,7,5,9] },
  { i: 3, ports: [10,14] },
  { i: 4, ports: [11,13] },
  { i: 5, ports: [6, 8] },
  { i: 6, ports: [12,17] },
];

var portToGPIO = [
  {i: 0, p: 0},
  {i: 1, p: 0},
  {i: 2, p: 0},
  {i: 3, p: 0},
  {i: 4, p: 0},
  {i: 5, p: 0},
  {i: 6, p: 0},
  {i: 7, p: 0},
  {i: 8, p: 0},
  {i: 9, p: 0},
  {i: 10, p: 0},
  {i: 11, p: 0},
  {i: 12, p: 0},
  {i: 13, p: 0},
  {i: 14, p: 0},
  {i: 15, p: 0},
  {i: 16, p: 0},
  {i: 17, p: 0},
  {i: 18, p: 0},
  {i: 19, p: 0},
];

app.get('/', function (req, res){
    res.send(pug.renderFile('./views/index.pug'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('change', function(data) {
        io.emit('changed', data, insToPort);
        /*data.forEach(element => {
           exec('python pi.py  1'); 
        });*/        
      });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });  

    //io.emit('changed', sample_json, insToPort);
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var sample_json = [
    {i: 0, v: 1},
    {i: 1, v: 0},
    {i: 2, v: 0},
    {i: 3, v: 0},
    {i: 4, v: 0},
];

 /*setInterval(function(){
    io.emit('changed', generateRandom(), insToPort);
}, 100); */ 

function generateRandom(){
    var arr = [];
    for (let index = 0; index < 8; index++) {
      arr.push({i: index, v: Math.floor(Math.random() * 2)})
    }
    return arr;
}