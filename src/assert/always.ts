import {assert} from './assert';

/**
 * Condition always should be true
 */
export function always(condition: boolean, code: string): asserts condition {
  assert(condition === true, code);
}
