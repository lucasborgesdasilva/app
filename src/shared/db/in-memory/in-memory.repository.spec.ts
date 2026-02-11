import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  entity_id?: Uuid;
  name: string;
  price: number;
}

class StubEntity extends Entity{
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityProps) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  })

  test('should create a new Entity', async () => {
    const entity = new StubEntity({ 
      entity_id: new Uuid(), 
      name: 'test', 
      price: 10 
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toStrictEqual(entity);
  });

  test('should bulk insert new Entities', async () => {
    const entities = [
      new StubEntity({ 
        entity_id: new Uuid(), 
        name: 'test1', 
        price: 10 
      }),
      new StubEntity({ 
        entity_id: new Uuid(), 
        name: 'test2', 
        price: 20 
      })
    ];
    
    await repo.bulkInsert(entities);    

    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toStrictEqual(entities[0]);
    expect(repo.items[1]).toStrictEqual(entities[1]);
  });

  test('should update an Entity', async () => {
    const entity = new StubEntity({ 
      entity_id: new Uuid(), 
      name: 'test', 
      price: 10 
    });

    await repo.insert(entity);

    entity.name = 'updated';
    entity.price = 20;

    await repo.update(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toStrictEqual(entity);
  });

  test('should not update an Entity that does not exist', async () => {
    const entity = new StubEntity({ 
      entity_id: new Uuid(), 
      name: 'test', 
      price: 10 
    });

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, repo.getEntity())
    );
  });

  test('should delete an Entity', async () => {
    const entity = new StubEntity({ 
      entity_id: new Uuid(), 
      name: 'test', 
      price: 10 
    });

    await repo.insert(entity);
    await repo.delete(entity.entity_id);

    expect(repo.items.length).toBe(0);
  });

  test('should not delete an Entity that does not exist', async () => {
    const entity_id = new Uuid();

    await expect(repo.delete(entity_id)).rejects.toThrow(
      new NotFoundError(entity_id, repo.getEntity())
    );
  });

  test('should find an Entity by id', async () => {
    const entity = new StubEntity({ 
      entity_id: new Uuid(), 
      name: 'test', 
      price: 10 
    });

    await repo.insert(entity);

    const found = await repo.findById(entity.entity_id);

    expect(found).toStrictEqual(entity);
  });

  test('should return null when Entity not found by id', async () => {
    const entity_id = new Uuid();

    const found = await repo.findById(entity_id);

    expect(found).toBeNull();
  });

  test('should find all Entities', async () => {
    const entities = [
      new StubEntity({ 
        entity_id: new Uuid(), 
        name: 'test1', 
        price: 10 
      }),
      new StubEntity({ 
        entity_id: new Uuid(), 
        name: 'test2', 
        price: 20 
      })
    ];

    await repo.bulkInsert(entities);

    const found = await repo.findAll();

    expect(found).toStrictEqual(entities);
  });
});