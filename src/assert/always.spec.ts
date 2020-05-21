import {always} from './always';

describe(`always()`, () => {
  it(`evaluates booleans`, () => {
    expect(() => always(true, 'test')).not.toThrow();
    expect(() => always(false, 'test')).toThrow();
  });

  it(`complains when given an empty code.`, () => {
    expect(() => always(false, '')).toThrowError(/code/gi);
  });
});
