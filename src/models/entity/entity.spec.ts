import {Entity} from './entity';
import {ValueObject} from '../value-object/value-object';

interface TestedEntityIdProps {
  id: string;
}

class TestedEntityId extends ValueObject<TestedEntityIdProps> {
  private constructor(protected readonly props: TestedEntityIdProps) {
    super(props);
  }

  static create(id: string): TestedEntityId {
    return new TestedEntityId({id});
  }
}

interface TestedEntityDto {
  id: string;
}

interface TestedEntityProps {
  id: ValueObject<TestedEntityIdProps>;
}

class TestedEntity extends Entity<TestedEntityProps> {
  private constructor(protected readonly props: TestedEntityProps) {
    super(props);
  }

  static create(testedEntityDto: TestedEntityDto): TestedEntity {
    const testedEntityProps: TestedEntityProps = {
      id: TestedEntityId.create(testedEntityDto.id),
    };

    return new TestedEntity(testedEntityProps);
  }
}

describe('Entity', () => {
  it('should equals by reference', () => {
    const a = TestedEntity.create({id: '123'});
    const b = a;

    expect(a.equals(b)).toBe(true);
  });

  it('should equals by id', () => {
    const a = TestedEntity.create({id: '123'});
    const b = TestedEntity.create({id: '123'});

    expect(a.equals(b)).toBe(true);
  });

  it('should not equals if compared object is null', () => {
    const a = TestedEntity.create({id: '123'});

    expect(a.equals(null as any)).toBe(false);
  });

  it('should not equals if compared object is not Entity', () => {
    const a = TestedEntity.create({id: '123'});

    expect(a.equals('string' as any)).toBe(false);
  });
});
