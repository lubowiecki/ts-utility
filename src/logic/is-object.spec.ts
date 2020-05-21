import {isObject} from './is-object';

describe('is object', () => {
  it('object', () => {
    expect(isObject({})).toBe(true);
  });

  it('new object', () => {
    expect(isObject(new Object())).toBe(true);
  });

  it('function', () => {
    expect(isObject(function a() {})).toBe(false);
  });

  it('arrow function', () => {
    expect(isObject(() => {})).toBe(false);
  });

  it('new function', () => {
    expect(isObject(new Function())).toBe(false);
  });

  it('function ref', () => {
    const fn = () => {};
    expect(isObject(fn)).toBe(false);
  });

  it('string', () => {
    expect(isObject('')).toBe(false);
  });

  it('number', () => {
    expect(isObject(1)).toBe(false);
  });

  it('new promise', () => {
    expect(isObject(new Promise(() => ''))).toBe(false);
  });
});
