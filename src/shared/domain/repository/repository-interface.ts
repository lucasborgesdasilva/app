import { Entity } from "../entity";
import { ValueObject } from "../value-object";

/**
 * Criei um repositório genérico para ser utilizado por todas as entidades do sistema.
 * Ele define as operações básicas de inserção, atualização, exclusão e consulta.
 * Cada entidade específica pode ter seu próprio repositório que estende esse repositório genérico.
 */
export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: EntityId): Promise<void>;

  findById(entity_id: EntityId): Promise<E>;
  findAll(): Promise<E[]>;

  bulkInsert(entities: E[]): Promise<void>;
  getEntity(): new (...args: any[]) => E;
}