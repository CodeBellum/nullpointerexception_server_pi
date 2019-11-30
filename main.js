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
  {i: 0, p: 2},
  {i: 1, p: 3},
  {i: 2, p: 4},
  {i: 3, p: 9},
  {i: 4, p: 11},
  {i: 5, p: 6},
  {i: 6, p: 13},
  {i: 7, p: 19},
  {i: 8, p: 26},
  {i: 9, p: 14},
  {i: 10, p: 15},
  {i: 11, p: 18},
  {i: 12, p: 23},
  {i: 13, p: 24},
  {i: 14, p: 25},
  {i: 15, p: 8},
  {i: 16, p: 12},
  {i: 17, p: 16},
  {i: 18, p: 20},
  {i: 19, p: 21},
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
        var gpioArr = [];
        data.forEach(element => {
          var ports = getPorts(element.i, insToPort);
          ports.forEach(elem => {
            var gpio = getGPIOPort(elem, portToGPIO);
            gpioArr.push({i: gpio, v: element.v});
            //exec('python pi.py ' + gpio + ' ' + element.v);
          });
        });
        exec('python pi.py ' + JSON.stringify(gpioArr));        
      });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });  

    //io.emit('changed', sample_json, insToPort);
  });

function getPorts(id, portsMapping){
  var result = [];
  
  portsMapping.forEach(el => {
    if (el.i == id)
    result = el.ports;
  });

  return result;
}  

function getGPIOPort(id, mapping) {
  var result = -1;
  mapping.forEach(el => {
    if (el.i == id) {
      result = el.p;
    }
  })

  return result;
}

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