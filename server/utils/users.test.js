const expect = require('expect');

const {Users} = require('./users');


describe ('Users',()=> {

var users;

beforeEach(() => {
  users = new Users();
  users.users = [
    {id:'1',name:"Mike",room:'Room1'},
    {id:'2',name:"John",room:'Room1'},
    {id:'3',name:"Joseph",room:'Room2'},
    {id:'4',name:"Diana",room:'Room2'},
  ]
})

it ('should add new user...',()=> {

var users = new Users();

var user = {
  id:'123',
  name: 'Joe',
  room: 'room1'
}

var retUser = users.addUser(user.id,user.name,user.room);

expect(users.users).toEqual([retUser])

})

it('should return array of users based on Room1 passed......',()=> {

  var userList = users.getUserList('Room1');

expect(userList).toEqual(['Mike','John'])

})

it('should return array of users based on Room2 passed......',()=> {

  var userList = users.getUserList('Room2');

expect(userList).toEqual(['Joseph','Diana'])

})

it('should return object of user identified from id.....',()=> {;

var user = users.getUser('1');

expect(user.name).toBe('Mike');


});

it('should remove object of user identified from id.....',()=> {;

  var user = users.getUser('2');
  
  expect(user.name).toBe('John');

});

}) // End of Describe block
