export function isFunction(value: unknown): value is () => Promise<boolean> | boolean {
  return typeof value === 'function';
}
