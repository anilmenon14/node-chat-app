var expect = require('expect');


const {generateMessage,generateLocationMessage} = require('./message');


describe ( 'generateMessage' , () => {

it('should generate correct message object' ,() => {

var result = generateMessage("Anil","Hello. This is a test")

expect(result.from).toBe("Anil")
expect(result.text).toBe("Hello. This is a test")
expect(result.createdAt).toBeA('number')

});


it('should generate a correct location message object', () => {

var result = generateLocationMessage("Anil","25.55","35.55");

expect(result.from).toBe("Anil")
expect(result.url).toBe("https://www.google.com/maps?q=25.55,35.55")
expect(result.createdAt).toBeA('number')


});

});
