export function assert(condition: boolean, code: string): asserts condition {
  if (typeof condition !== 'boolean') {
    throw new TypeError(`Argument 'condition' must be a boolean.`);
  }
  if (code == null || typeof code !== 'string' || (typeof code === 'string' && code.length < 1)) {
    throw new TypeError(`Argument 'code' must be provided.`);
  }

  if (condition === false) {
    throw new Error(`Client Error: ${code}`);
  }
}
