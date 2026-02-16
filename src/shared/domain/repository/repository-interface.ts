import { Entity } from "../entity";
import { ValueObject } from "../value-object";
import { SearchParams } from "./search-params";
import { SearchResult } from "./search-result";

/**
 * Criei um repositório genérico para ser utilizado por todas as entidades do sistema.
 * Ele define as operações básicas de inserção, atualização, exclusão e consulta.
 * Cada entidade específica pode ter seu próprio repositório que estende esse repositório genérico.
 */
export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: EntityId): Promise<void>;

  findById(entity_id: EntityId): Promise<E | null>;
  findAll(): Promise<E[]>;

  bulkInsert(entities: E[]): Promise<void>;
  getEntity(): new (...args: any[]) => E;
}

/**
 * O ISearchableRepository é uma extensão do IRepository que adiciona a funcionalidade de busca com paginação, ordenação e filtragem.
 * Ele define um método search que recebe os parâmetros de busca e retorna um resultado de busca paginado.
 * Cada entidade específica pode ter seu próprio repositório que estende esse repositório genérico de busca.
 */
export interface ISearchableRepository<
  E extends Entity, 
  EntityId extends ValueObject, 
  Filter = string,
  SearchInput = SearchParams<Filter>, 
  SearchOutput = SearchResult
> extends IRepository<E, EntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}