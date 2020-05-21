import {Maybe} from '../types/maybe';

export function isDefined<T>(x: Maybe<T>): x is T {
  return x !== undefined && x !== null;
}
