var Validator = require('jsonschema').Validator;
var isPlugin = require('..');
var v = new Validator();

v.attributes.is = isPlugin();

var schema = {
  type: 'object',
  properties: {
    emails: { type: 'array', is: 'all.email' }
  }
};

var result1 = v.validate({
  emails: [ 'a@test.cc', 'b@test.cc', 123, 'test' ]
}, schema);
var result2 = v.validate({
  emails: [ 'a@test.cc', 'b@test.cc', 'test@ggg.gg' ]
}, schema);

console.log(result1.errors);  // error
console.log(result2.errors);  // not error