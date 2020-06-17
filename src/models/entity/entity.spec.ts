import {Entity} from './entity';
import {ValueObject} from '../value-object/value-object';

interface IdProps {
  id: string;
}

class Id extends ValueObject<IdProps> {
  private constructor(protected readonly props: IdProps) {
    super(props);
  }

  static create(id: string): Id {
    return new Id({id});
  }
}

interface TestedEntityDto {
  id: Id;
  value: string;
}

interface TestedEntityProps {
  id: Id;
  value: string;
}

class TestedEntity extends Entity<TestedEntityProps> {
  private constructor(protected readonly props: TestedEntityProps) {
    super(props);
  }

  static create(testedEntityDto: TestedEntityDto): TestedEntity {
    return new TestedEntity(testedEntityDto);
  }
}

describe('Entity', () => {
  it('should equals by reference', () => {
    const id = Id.create('123');
    const a = TestedEntity.create({id, value: 'example'});
    const b = a;

    expect(a.equals(b)).toBe(true);
  });

  it('should equals by id', () => {
    const id1 = Id.create('123');
    const id2 = Id.create('123');
    const a = TestedEntity.create({id: id1, value: 'example1'});
    const b = TestedEntity.create({id: id2, value: 'example2'});

    expect(a.equals(b)).toBe(true);
  });

  it('should not equal if id1 not equals id2', () => {
    const id1 = Id.create('123');
    const id2 = Id.create('1234');
    const a = TestedEntity.create({id: id1, value: 'example'});
    const b = TestedEntity.create({id: id2, value: 'example'});

    expect(a.equals(b)).toBe(false);
  });

  it('should not equals if compared object is null', () => {
    const id = Id.create('123');
    const a = TestedEntity.create({id, value: 'example'});

    expect(a.equals(null as any)).toBe(false);
  });

  it('should not equals if compared object is not Entity', () => {
    const id = Id.create('123');
    const a = TestedEntity.create({id, value: 'example'});

    expect(a.equals('string' as any)).toBe(false);
  });
});
