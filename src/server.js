var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
var path = __dirname + '/';

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client')); // make files in /public available

var totalUsers = 0;
var userFields = { user_id: 0, user_score: 0, user_count: 0 };
var users = []


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "client/index.html");
});


app.use("/",router);

// app.use("*",function(req,res){
// 	console.log("wtf m8");
//   res.sendFile(path + "404.html");
// });


io.on('connection', function(socket){
    totalUsers = totalUsers + 1;
    
    console.log('User number ' + totalUsers + " connected!");

    users[totalUsers] = userFields;
    users[totalUsers].user_count = totalUsers;
    users[totalUsers].user_id = socket.id;
    io.emit("inituserinfo", users[totalUsers]);
    socket.on('gettopscores', function(id, msg){
        console.log(id, msg);
        socket.broadcast.to(id).emit('recievetopscores', users[msg.id]);
    });

    // socket.on('updatescore', function(msg){
    //     console.log('message: ' + msg);
    // });
    // socket.on('gettopscores', function(msg){
    //     console.log('message: ' + msg);
    // });
});


server.listen(3000,function(){
    console.log("Live at Port 3000");
});