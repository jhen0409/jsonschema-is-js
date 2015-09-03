var Validator = require('jsonschema').Validator;
var isPlugin = require('..');
var v = new Validator();

v.attributes.is = isPlugin();

var schema = {
  type: 'object',
  properties: {
    text: { type: 'string', is: 'include:some' }
  }
};

var result1 = v.validate({
  text: '123456'
}, schema);
var result2 = v.validate({
  text: 'some text...'
}, schema);

console.log(result1.errors);  // error
console.log(result2.errors);  // not error