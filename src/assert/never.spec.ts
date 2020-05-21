import {never} from './never';

describe(`never()`, () => {
  it(`evaluates booleans`, () => {
    expect(() => never(false, 'test')).not.toThrow();
    expect(() => never(true, 'test')).toThrow();
  });

  it(`complains when given an empty code.`, () => {
    expect(() => never(true, '')).toThrowError(/code/gi);
  });
});
