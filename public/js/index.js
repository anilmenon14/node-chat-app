var socket = io(); // opening socket io connection
// io() function is available to the HTML script since it is preloaded from the script tag just above i.e. socket.io.js

// Client side event based action
socket.on('connect', function() {
console.log('Connected to server');

// socket.emit('createMessage',{
//   from:"Anil Menon",
//   text: "Thanks a lot , JP"
// }, function(message) {
//   console.log('message from server :',message);
// })


});

socket.on('disconnect', function() {

  console.log('Disconnected from server');
});

//Custom event defined in server.js

socket.on('newMessage', function(message){
// here 'message' is contents of 2nd argument of server side emit function
console.log('New message has been received', message);

var li = $('<li></li>');

li.text(`${message.from} : ${message.text}`);

$("#messages").append(li);

});

$("#message-form").on('submit', function(e) {

e.preventDefault() ; //IMPORTANT step. This prevents the usual browser action to try and reload.
console.log('Sending message......');

socket.emit('createMessage',{
  from:"Anil Menon",
  text: $( "input" ).val()
}, function(message) {
  console.log('message from server :',message);
})
});
