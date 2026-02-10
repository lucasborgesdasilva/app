export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => any) {
    const entityName = entityClass.name;
    const idString = Array.isArray(id) ? id.join(", ") : id;
    
    super(`${entityName} with ID ${idString} not found.`);
    this.name = "NotFoundError";
  }
}