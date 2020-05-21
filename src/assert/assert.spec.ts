import {assert} from './assert';

describe(`assert()`, () => {
  it(`evaluates booleans`, () => {
    expect(() => assert(true, 'code')).not.toThrow();
    expect(() => assert(false, 'code')).toThrow();
  });

  it(`complains when given an empty code.`, () => {
    expect(() => assert(false, '')).toThrowError(/code/gi);
  });
});
