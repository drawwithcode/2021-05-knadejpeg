const { Socket } = require("engine.io");

let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);

console.log("server up and running");


app.use(express.static('public'));

let serverSocket = require('socket.io');

let io = serverSocket(server);

io.on('connection', newConnection);

console.log("server up and running");
console.log("running server on http://localhost:" + port);

function newConnection(newSocket) {
    console.log("new connection:", newSocket.id);
    newSocket.on("mouse", incomingMouseMessage);

    function incomingMouseMessage(dataReceived){
        console.log(dataReceived);
        newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
  
 
}

  
  
