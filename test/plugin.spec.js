import { expect } from 'chai';
import { Validator } from 'jsonschema';
import isPlugin from '../src/plugin';

const v = new Validator();

v.attributes.is = isPlugin();

describe('jsonschema is.js tests', () => {
  it('should have schema function error', () => {
    const schema = {
      type: 'object',
      properties: {
        emails: { type: 'array', is: 'all.emali' },  // <- typo
      },
    };
    const result = v.validate({ emails: ['a@test.cc', 'b@test.cc'] }, schema);
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].message).to.equal('function not found: isjs.all.emali');
  });

  it('should pass', () => {
    const schema = {
      type: 'object',
      properties: {
        emails: { type: 'array', is: 'all.email' },
      },
    };
    const result = v.validate({ emails: ['a@test.cc', 'b@test.cc'] }, schema);
    expect(result.errors).to.have.length(0);
  });

  it('should have 1 error', () => {
    const schema = {
      type: 'object',
      properties: {
        emails: { type: 'array', is: 'all.email' },
      },
    };
    const result = v.validate({ emails: ['a@test.cc', 'b@test.cc', 123, 'test'] }, schema);
    expect(result.errors).to.have.length(1);
  });

  it('should pass two parameter function', () => {
    const schema = {
      type: 'object',
      properties: {
        text: { type: 'string', is: 'include:some text' },
      },
    };
    const result = v.validate({ text: 'some text...' }, schema);
    expect(result.errors).to.have.length(0);
  });

  it('should not pass two parameter function', () => {
    const schema = {
      type: 'object',
      properties: {
        text: { type: 'string', is: 'include:    some text' },
      },
    };
    const result = v.validate({ text: 'some text...' }, schema);
    expect(result.errors).to.have.length(1);
  });
});
