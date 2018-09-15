// Inbuilt modules
const path = require('path');
const http = require ('http'); // http is required for socket integration

// Installed modules
const express = require('express');
const socketIO = require('socket.io');

//imported modules created
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname + "/../public/");



var app = express();
var server = http.createServer(app); // Interesting fact: app.listen actually calls http.createServer as well. This is why in a normal non-socket app , it is not needed
var io = socketIO(server);
const port = process.env.PORT || 3000;


app.use(express.static(publicPath));  // '/' path of URL is served up with contents in the folder publicPath

// Below is an event listener based on connection created
io.on('connection',(socket)=> {

  console.log('New connection established with client');

  // Emit custom event on connection

  // socket.emit("newMessage",{
  //   from:"John Petrucci",
  //   text: "Keep at it, Anil. You will get there!",
  //   createdAt: Date.now()
  // });

socket.emit('newMessage',generateMessage("Admin","Welcome to the group!"));

socket.broadcast.emit('newMessage',generateMessage("Admin","New user has joined the group"));



socket.on('createMessage', (message,callback)=> {
console.log('New message has been sent in ', generateMessage(message.from, message.text));

//io.emit is to send to all connected sessions.
io.emit('newMessage',generateMessage(message.from, message.text))

callback('Successfully received');

//socket.broadcast.emit is used to send to everyone but the one who sent the original message (i.e. won't be sent to one who sent in the createMessage)
// socket.broadcast.emit('newMessage',generateMessage(message.from, message.text));

})

      socket.on('disconnect', (reason) => {
        console.log('Disconnected with reason of ',reason);
      });
});


io.on('disconnection',(socket)=> {

  console.log(' Disconnected from client');
})

server.listen(port,() => {
  console.log('Started on port ',port);
});
// app.listen and server.listen have the exact same params since http and express have been created close to each other
