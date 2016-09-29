// require express
var express=require('express');
// create exxpress
var app=express();
// creat sever
var http=require('http').Server(app);
// create static
app.use(express.static('public'));
// view engine
app.set('view engine','hbs');
// set views
app.set('views','./views');
// requrie socketio
var io= require('socket.io')(http);
// router /
app.get('/',function(req,res){
	res.render('index');
})
//creat array;
var arr = [];
// event connect
io.on("connection", function(socket){
  console.log("Co nguoi ket noi! ");

  socket.on("send_data", function(data){
    arr.push(data);
    io.sockets.emit("data_send",  {ct:data});
  });
});
//port 3000
http.listen(3000);
