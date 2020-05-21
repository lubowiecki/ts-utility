import {assert} from './assert';

export function always(condition: boolean, code: string): asserts condition {
  assert(condition === true, code);
}
