import { isFunction, isString, dasherize } from './utils';

export function serializeStyle(style) {
  if (!style) return '';
  if (isString(style)) return style;
  const attrsArray = [];
  for (const key in style) {
    const keyName = dasherize(key);
    let value = style[key];
    if (value) {
      if (isFunction(value)) {
        value = value();
      }
      if (value) {
        attrsArray.push(`${keyName}:${value};`);
      }
    }
  }
  return attrsArray.join('');
}
