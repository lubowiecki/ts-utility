import {Maybe} from '../types/maybe';

/**
 * Checks if param exists (is not null or undefined)
 */
export function isDefined<T>(x: Maybe<T>): x is T {
  return x !== undefined && x !== null;
}
