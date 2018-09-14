var expect = require('expect');


const {generateMessage} = require('./message');


describe ( 'generateMessage' , () => {

it('should generate correct message object' ,() => {

var result = generateMessage("Anil","Hello. This is a test")

expect(result.from).toBe("Anil")
expect(result.text).toBe("Hello. This is a test")
expect(result.createdAt).toBeA('number')

});


});
