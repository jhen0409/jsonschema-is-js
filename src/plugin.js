import is from 'is_js';
import jsonschema from 'jsonschema';

export default function createPlugin() {
  return function validateIsJs(instance, schema, options, ctx) {
    let property = '';
    Object.keys(this.attributes).every((key) => {
      if (this.attributes[key] == validateIsJs) {
        property = key;
        return false;
      }
      return true;
    });

    const method = schema[property];
    if (typeof method != 'string') {
      throw new jsonschema.SchemaError(`${property} expects a string`, schema);
    }

    let call = is;
    const parts = method.split('.')
    for (let part of parts) {
      call = call[part];
      if (!call) {
        return `function not found: isjs.${method}`;
      }
    }
    if (!call(instance)) {
      return `not match isjs.${method}`;
    }
  }
};