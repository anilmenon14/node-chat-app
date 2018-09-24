var expect = require('expect');


const {isValidJoin} = require('./validator');


describe ('isValidJoin : Check for valid parameters passed to Join page', () => {


it('should return true when name and room are valid strings....', ()=> {
var params = {
  name: "John Petrucci",
  room: "Best Guitarists room"
}
expect(isValidJoin(params)).toBe(true);

});

it('should return false when name field is passed as a non-string value....', ()=> {
var params = {
  name: 1,
  room: "Best Guitarists room"
}
expect(isValidJoin(params)).toBe(false);

});


it('should return false when name field is passed as a blank space string....', ()=> {
var params = {
  name: "                         ",
  room: "Best Guitarists room"
}
expect(isValidJoin(params)).toBe(false);

});


it('should return false when room field is passed as a non-string value....', ()=> {
var params = {
  name: "John Petrucci",
  room: 1
}
expect(isValidJoin(params)).toBe(false);

});

it('should return false when room field is passed as blank space string...', ()=> {
var params = {
  name: "John Petrucci",
  room: "                   "
}
expect(isValidJoin(params)).toBe(false);

});



}); // end of describe block to 'Check for valid parameters passed to Join page'
