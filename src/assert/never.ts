import {assert} from './assert';

/**
 * Condition always should be false
 */
export function never(condition: boolean, code: string): asserts condition {
  assert(condition === false, code);
}
