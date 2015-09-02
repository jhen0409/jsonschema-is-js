# JavaScript jsonschema is-js plugin

[![Build Status](https://travis-ci.org/jhen0409/jsonschema-is-js-plugin.svg)](https://travis-ci.org/jhen0409/jsonschema-is-js-plugin)
[![NPM version](http://img.shields.io/npm/v/jsonschema-is-js.svg?style=flat)](https://www.npmjs.com/package/jsonschema-is-js)

[jsonschema](https://github.com/tdegrunt/jsonschema) validator property include is.js functions.

## Install

```
npm i --save jsonschema-is-js
```

## Usage

```js
var Validator = require('jsonschema').Validator;
var isPlugin = require('jsonschema-is-js');
var v = new Validator();

v.attributes.is = isPlugin();

var schema = {
  type: 'object',
  properties: {
    emails: { type: 'array', is: 'all.email' }  // <- use attribute
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
```

## LICENSE

[MIT](LICENSE)