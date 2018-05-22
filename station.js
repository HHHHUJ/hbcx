var app = require('express')();
var server = require('http').createServer(app);
var http = require('http')
var conn = require('./conn')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require("async")
var superagent = require("superagent")
var cheerio = require("cheerio")
const io = require('socket.io').listen(server)
io.sockets.on('connection', (socket) => {
  var timer = '';
  console.log('链接成功');
  socket.on('start', () => {//监听前端发送的start
      timer = setInterval(function () {//定时器每五秒发一次
          socket.emit('login', {//触发emit,前端接收
              "Action": "DataRecv",
              "Data": {
              "Reporting_mode": {"T":"I","V":5},
          }
          });
      },5000)
  });
});
const charset = require('superagent-charset');
charset(superagent)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var host = "localhost"
var port = "7100"
var fs = require('fs')

//解决跨域
app.all('*',function(req,res,next){
  // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  next()
});



  server.listen(port,host,()=>{
    console.log(`the server is running at ${host}:${port}`)
})