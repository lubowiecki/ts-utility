import {assert} from './assert';

export function never(condition: boolean, code: string): asserts condition {
  assert(condition === false, code);
}
