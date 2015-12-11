import { isFunction, startsWith } from './utils';

export function attachEvents(attrs, node) {
  for (const key in attrs) {
    if (startsWith(key, 'on')) {
      const value = attrs[key];
      if (isFunction(value)) {
        const eventName = key.replace('on', '').toLowerCase();
        node.addEventListener(eventName, value);
      }
    }
  }
}
