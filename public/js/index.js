var socket = io(); // opening socket io connection
// io() function is available to the HTML script since it is preloaded from the script tag just above i.e. socket.io.js

// Client side event based action
socket.on('connect', function() {
console.log('Connected to server');

// socket.emit('createMessage',{
//   from:"Anil Menon",
//   text: "Thanks a lot , JP"
// })


});

socket.on('disconnect', function() {

  console.log('Disconnected from server');
});

//Custom event defined in server.js

socket.on('newMessage', function(message){
// here 'message' is contents of 2nd argument of server side emit function
console.log('New message has been received', message);

});
