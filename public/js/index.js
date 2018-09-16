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

socket.on('newLocationMessage', function(message){
// here 'message' is contents of 2nd argument of server side emit function
console.log('New message has been received', message);
var li = $('<li></li>');
var a = $('<a target="_blank">Location link</a>')
a.attr("href", `${message.url}`)
li.text(`${message.from} : `);
li.append(a)
$("#messages").append(li);
});

$("#message-form").on('submit', function(e) {
e.preventDefault() ; //IMPORTANT step. This prevents the usual browser action to try and reload.
socket.emit('createMessage',{
  from:"Anil Menon",
  text: $( "input" ).val()
}, function(message) {
  console.log('message from server :',message);
})
});

var locationButton = $("#send-location")

locationButton.click(function(e){
 e.preventDefault();
 if(!navigator.geolocation) {
   return alert('Geolocation not supported by your browser')
 }
// Below function has 2 callbacks , first for pass case and 2nd for fail case
navigator.geolocation.getCurrentPosition(function(position){
socket.emit('createLocationMessage', {
  latitude: position.coords.latitude,
  longitude: position.coords.longitude
})
 }, function() {
alert('Unable to fetch location. Ensure that settings on browser does not block location accesss')
 });
});
