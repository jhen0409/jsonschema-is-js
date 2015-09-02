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

    var call = _is_js2['default'];
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

    if (!call(instance)) {
      return 'not match isjs.' + method;
    }
  };
}

;
module.exports = exports['default'];