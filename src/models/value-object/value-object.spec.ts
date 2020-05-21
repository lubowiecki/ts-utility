import {ValueObject} from './value-object';

interface TestedValueObjectProps {
  name: string;
  city: {
    name: string;
  };
}

class TestedValueObject extends ValueObject<TestedValueObjectProps> {
  private constructor(protected readonly props: TestedValueObjectProps) {
    super(props);
  }

  static create(name: string, cityName: string): TestedValueObject {
    return new TestedValueObject({name, city: {name: cityName}});
  }
}

describe('ValueObject', () => {
  it('should equals by reference', () => {
    const a = TestedValueObject.create('name', 'cityName');
    const b = a;

    expect(a.equals(b)).toBe(true);
  });

  it('should equals by structure', () => {
    const a = TestedValueObject.create('name', 'cityName');
    const b = TestedValueObject.create('name', 'cityName');

    expect(a.equals(b)).toBe(true);
  });

  it('should not equals if compared object is null', () => {
    const a = TestedValueObject.create('name', 'cityName');

    expect(a.equals(null as any)).toBe(false);
  });

  it('should not equals if compared object is not ValueObject', () => {
    const a = TestedValueObject.create('name', 'cityName');

    expect(a.equals('string' as any)).toBe(false);
  });
});
