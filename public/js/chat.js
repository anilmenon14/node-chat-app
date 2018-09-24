var socket = io(); // opening socket io connection
// io() function is available to the HTML script since it is preloaded from the script tag just above i.e. socket.io.js

// Scroll height function to scroll below to latest message IF AND ONLY IF user is already at the bottom
// If user is not at the bottom, it will not scroll . This is a feature that allows users to read older messages without getting pulled to bottom if people are actively texting
function  scrollToBottom() {
// Selectors
var messages = $('#messages');
var newMessage = messages.children('li:last-child'); // This picks up the last item in the <li> , i.e. the last message we appeded just before calling this scrollToBottom function
//Heights
var clientHeight = messages.prop('clientHeight')
var scrollTop = messages.prop('scrollTop')
var scrollHeight = messages.prop('scrollHeight')
var newMessageHeight = newMessage.innerHeight(); // Height of last message added
var lastMessageHeight = newMessage.prev().innerHeight(); // Picked up <li> just before last one and found out height of that message too.

if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
  // console.log(`clientHeight:${clientHeight}, scrollTop:${scrollTop},newMessageHeight:${newMessageHeight},lastMessageHeight:${lastMessageHeight},scrollHeight:${scrollHeight}`);
  // console.log('Should scroll');
  messages.scrollTop(scrollHeight); // Moves postiom relatively for scrollTop to ensure that context is at the bottom of screen
}
}


// Client side event based action
socket.on('connect', function() {
console.log('Connected to server');

var params = $.deparam(window.location.search); // pull up the query that was passed from Join (index.html) to chat.html. This is a custom function that was included as script tag in chat.html

socket.emit('join',params,function(err) {
  if (err) {
    alert(err);
    window.location.href = "/";
  }
  else {
    console.log('No errors seen');
  };

})

});

socket.on('disconnect', function() {

  console.log('Disconnected from server');
});

//Custom event defined in server.js

socket.on('newMessage', function(message){
  var template =  $("#message-template").html()
  //Mustache.js is useful to help render a template (defined in the html ), it injects fields into the template as seen below
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: moment(message.createdAt).format("h:mm a")
  });

  $("#messages").append(html);
  scrollToBottom();

// here 'message' is contents of 2nd argument of server side emit function
// console.log('New message has been received', message);
// var formattedTime = moment(message.createdAt).format("h:mm a")
// var li = $('<li></li>');
// li.text(`${message.from} ${formattedTime} : ${message.text}`);
// $("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
// here 'message' is return of 2nd argument of server side emit function

var template = $("#location-message-template").html();

var html = Mustache.render(template,{
  from: message.from,
  url : message.url,
  createdAt : moment(message.createdAt).format("h:mm a")
});

  $("#messages").append(html);
  scrollToBottom();

// console.log('New message has been received', message);
// var formattedTime = moment(message.createdAt).format("h:mm a")
// var li = $('<li></li>');
// var a = $('<a target="_blank">Location link</a>')
// a.attr("href", `${message.url}`)
// li.text(`${message.from} ${formattedTime} : `);
// li.append(a)
// $("#messages").append(li);
});

socket.on('updateRoomList',function(userList) {

var ul = $('<ul></ul>')

userList.forEach(function(user) {
  ul.append($('<li></li>').text(user))
})

$("#users").html(ul);

})


$("#message-form").on('submit', function(e) {
e.preventDefault() ; //IMPORTANT step. This prevents the usual browser action to try and reload.
socket.emit('createMessage',{
  text: $( "[name=message]" ).val() // targets the input text field
}, function(message) {
  // console.log('message from server :',message);
  //clear input text once successfully receives ack back from server
  $( "[name=message]" ).val("")
})
});

var locationButton = $("#send-location")

locationButton.click(function(e){
 e.preventDefault();
 locationButton.prop('disabled',true).text('Sending data....');
 if(!navigator.geolocation) {
   return alert('Geolocation not supported by your browser')
 }
// Below function has 2 callbacks , first for pass case and 2nd for fail case
navigator.geolocation.getCurrentPosition(function(position){
socket.emit('createLocationMessage', {
  latitude: position.coords.latitude,
  longitude: position.coords.longitude
},function(message)  {
  // console.log('message from server :',message);
  locationButton.text('Send Location').prop('disabled',false)
});
 }, function() {
alert('Unable to fetch location. Ensure that settings on browser does not block location accesss')
 });
});
