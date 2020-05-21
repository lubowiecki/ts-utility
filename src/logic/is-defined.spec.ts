import {isDefined} from './is-defined';

describe('is defined', () => {
  it('null', () => {
    expect(isDefined(null)).toBe(false);
  });

  it('undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });

  it('[]', () => {
    expect(isDefined([])).toBe(true);
  });

  it('{}', () => {
    expect(isDefined({})).toBe(true);
  });

  it('() => null', () => {
    expect(isDefined(() => null)).toBe(true);
  });

  it('0', () => {
    expect(isDefined(0)).toBe(true);
  });

  it(`''`, () => {
    expect(isDefined('')).toBe(true);
  });
});
