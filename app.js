// require express
var express = require('express');
// create exxpress
var app = express();
// creat sever
var http = require('http').Server(app);
// create static
app.use(express.static('public'));
// view engine
app.set('view engine', 'ejs');
// set views
app.set('views', './views');
// requrie socketio
var io = require('socket.io')(http);
// router /
app.get('/', function(req, res) {
    res.render('index');
})
//creat array;
var arr = [];
var user = [];
// event connect
io.on("connection", function(socket) {
    console.log("connected: " + socket.id);
    socket.on('send_user', function(dt) {
        user.push(dt);
        socket.user = dt
        console.log(dt);
    });
    socket.on("send_data", function(data) {
        arr.push(data);
        io.sockets.emit("data_send", { ct: data, ur: socket.user });
    });


});
io.on('disconnect', function() {
    console.log("ngat");

});
//port 3000
http.listen(process.env.PORT || 8000);