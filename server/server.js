// Inbuilt modules
const path = require('path');
const http = require ('http'); // http is required for socket integration

// Installed modules
const express = require('express');
const socketIO = require('socket.io');

//imported modules created
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');
const {isValidJoin} = require('./utils/validator')
const publicPath = path.join(__dirname + "/../public/");



var app = express();
var server = http.createServer(app); // Interesting fact: app.listen actually calls http.createServer as well. This is why in a normal non-socket app , it is not needed
var io = socketIO(server);
const port = process.env.PORT || 3000;

var userList = new Users();
var id = 1 // starting value of id

app.use(express.static(publicPath));  // '/' path of URL is served up with contents in the folder publicPath

// Below is an event listener based on connection created
io.on('connection',(socket)=> {

  console.log('New connection established with client');

socket.on('join', (params,callback) =>{

if (!isValidJoin(params)) {
return callback("Invalid name or room have been passed. Please try again")
}

  socket.join(params.room);
  userList.removeUser(socket.id); // Removing user from a room he was in before. i.e. if same session of browser was used for a previous connect
  userList.addUser(socket.id,params.name,params.room);
  // Concept of rooms:
  // io.emit send to all ... io.to(params.room).emit sends to those in the room ONLY
  // socket.broadcast.emit send to all but the person who made the socket call ... socket.broadcast.to(params.room).emit sends to all others in the ROOM except the socket connction intiator
  // socket.emit does not have a to() function since it is already a targetted call
  socket.emit('newMessage',generateMessage("Admin","Welcome to the group!"));
  //socket.broadcast.emit is used to send to everyone but the one who sent the original message (i.e. won't be sent to one who sent in the newMessage)
  socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has joined the room!`));
  io.to(params.room).emit('updateRoomList',userList.getUserList(params.room)); // sending list of users to front end
  callback();

});

socket.on('createMessage', (message,callback)=> {
//console.log('New message has been sent in ', generateMessage(userList.getUser(socket.id).name, message.text));
//io.emit is to send to all connected sessions.
io.emit('newMessage',generateMessage(userList.getUser(socket.id).name, message.text))
callback('Successfully received');
});

socket.on('createLocationMessage',(coords,callback)=> {

io.emit('newLocationMessage',generateLocationMessage(userList.getUser(socket.id).name,coords.latitude ,coords.longitude));
callback('Successfully received');
});



      socket.on('disconnect', (reason) => {
        // userList.getUser(socket.id).room is the room the user is currently in.
        var removedUser = userList.getUser(socket.id);
        if (removedUser){
          userList.removeUser(socket.id);
          io.to(removedUser.room).emit('newMessage',generateMessage("Admin",`${removedUser.name} has left the room!`));
          io.to(removedUser.room).emit('updateRoomList',userList.getUserList(removedUser.room));
          console.log('Disconnected with reason of ',reason);
        };
      });
});


io.on('disconnection',(socket)=> {
  console.log(' Disconnected from client');
})

server.listen(port,() => {
  console.log('Started on port ',port);
});
// app.listen and server.listen have the exact same params since http and express have been created close to each other
