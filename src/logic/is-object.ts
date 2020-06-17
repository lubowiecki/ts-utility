import {isPromise} from './is-promise';

/**
 * Checks if value is object
 */
export function isObject(item: any): boolean {
  return item != null && typeof item === 'object' && !Array.isArray(item) && !isPromise(item);
}
