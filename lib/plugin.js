'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createPlugin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _jsonschema = require('jsonschema');

var _jsonschema2 = _interopRequireDefault(_jsonschema);

function createPlugin() {
  var is = arguments.length <= 0 || arguments[0] === undefined ? _is_js2['default'] : arguments[0];

  return function validateIsJs(instance, schema, options, ctx) {
    var _this = this;

    var property = '';
    Object.keys(this.attributes).every(function (key) {
      if (_this.attributes[key] == validateIsJs) {
        property = key;
        return false;
      }
      return true;
    });

    var method = schema[property];
    if (typeof method != 'string') {
      throw new _jsonschema2['default'].SchemaError(property + ' expects a string', schema);
    }

    // value handle, ex: 'include:text' -> method: include, value: text
    var position = method.indexOf(':');
    var value = undefined;
    if (position >= 0) {
      value = method.substring(position + 1);
      method = method.substring(0, position);
    }

    var call = is;
    var parts = method.split('.');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var part = _step.value;

        call = call[part];
        if (!call) {
          return 'function not found: isjs.' + method;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var result = undefined;
    try {
      if (value) {
        result = call(instance, value);
      } else {
        result = call(instance);
      }
    } catch (e) {}
    if (instance !== undefined && !result) {
      return 'not match isjs.' + method;
    }
  };
}

;
module.exports = exports['default'];