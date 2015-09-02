const expect = require('chai').expect;
let Validator = require('jsonschema').Validator;
const isPlugin = require('..');
const v = new Validator();

v.attributes.is = isPlugin();

describe('jsonschema is.js tests', function() {

  it('should have schema function error', function(done) {
    const schema = {
      type: 'object',
      properties: {
        emails: { type: 'array', is: 'all.emali' }  // <- typo
      }
    };
    let result = v.validate({ emails: [ 'a@test.cc', 'b@test.cc' ] }, schema);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].message).to.equal('function not found: isjs.all.emali');
    done();
  });

  it('should pass', function(done) {
    const schema = {
      type: 'object',
      properties: {
        emails: { type: 'array', is: 'all.email' }
      }
    };
    let result = v.validate({ emails: [ 'a@test.cc', 'b@test.cc' ] }, schema);
    expect(result.errors).to.have.length(0);
    done();
  });

  it('should have 1 error', function(done) {
    const schema = {
      type: 'object',
      properties: {
        emails: { type: 'array', is: 'all.email' }
      }
    };
    let result = v.validate({ emails: [ 'a@test.cc', 'b@test.cc', 123, 'test' ] }, schema);
    expect(result.errors).to.have.length(1);
    done();
  });
});