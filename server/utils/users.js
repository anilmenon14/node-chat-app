[
{
  id: "EXAMPLE-SOCKET-ID",
  name: "Test1",
  room: "TestRoom1"
}
]

// Example of ES6 class
// class Address {
//   // constructor runs when object is initialized on ths class
//    constructor (building, floor, apartment) {
//      this.building = building,
//      this.floor = floor,
//      this.apartment = apartment
//    }
// // Functions on class
//    printAddress(){
//      return `Building:${this.building}, Floor:${this.floor}, Apartment:${this.apartment}`
//    }
// }
//
// // Initializing object on 'Address' createLocationMessage
// var AnilHome = new Address ('Marina Residence',2,202);
// console.log(AnilHome.printAddress());


//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {

  constructor() {
      this.users = [];
  }

  addUser(id,name,room){
    var user = {id,name,room}
    this.users.push(user);
    return user;
  }

  removeUser(id) {

    // return details of user removed
    var removedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser

  };

  getUser(id) {

    return this.users.filter((user) => user.id === id)[0];

  };

  getUserList(room) {
    // filters down the users array down to those which match criteria of room. Think of 'filter' as s for loop that iterates over each record (i.e. 'user' in this scenario);
    var filteredusers = this.users.filter((user) => user.room === room);
    var namesArray = filteredusers.map((user) => user.name);

    return namesArray;

  };

}


module.exports = {Users};
