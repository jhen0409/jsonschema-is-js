import isJs from 'is_js';
import jsonschema from 'jsonschema';

export default function createPlugin(is = isJs) {
  return function validateIsJs(instance, schema) {
    let property = '';
    Object.keys(this.attributes).every((key) => {
      if (this.attributes[key] === validateIsJs) {
        property = key;
        return false;
      }
      return true;
    });

    let method = schema[property];
    if (typeof method !== 'string') {
      throw new jsonschema.SchemaError(`${property} expects a string`, schema);
    }

    // value handle, ex: 'include:text' -> method: include, value: text
    const position = method.indexOf(':');
    let value;
    if (position >= 0) {
      value = method.substring(position + 1);
      method = method.substring(0, position);
    }

    let call = is;
    const parts = method.split('.');
    for (const part of parts) {
      call = call[part];
      if (!call) {
        return `function not found: isjs.${method}`;
      }
    }

    let result;
    try {
      if (value) {
        result = call(instance, value);
      } else {
        result = call(instance);
      }
    /* eslint no-empty:0 */
    } catch (e) {}
    if (instance !== undefined && !result) {
      return `not match isjs.${method}`;
    }
  };
}
