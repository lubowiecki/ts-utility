/**
 * Checks if value is promise
 */

export function isPromise<T>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}
