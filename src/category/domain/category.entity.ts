//Estou usando uma modelagem de entidade purista, sem frameworks ou bibliotecas. tendendo a ser rica e não anêmica. que no caso, a entidade tem apenas atributos e um construtor simples.
//Isso tudo com base no DDD - Domain Driven Design.
export type CategoryConstructorProps = {
  category_id?: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
}

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export class Category {
  category_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id;
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  //factory method
  //Ao invés de usar o new Category, do construtor, usamos esse método estático.
  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
  }

  //Por que não usar setters e getters?
  //Setters e getters são considerados uma má prática em DDD, pois expõem os detalhes internos da entidade, violando o encapsulamento.
  //Além disso, eles podem levar a um design anêmico, onde a entidade se torna apenas um contêiner de dados sem comportamento significativo.
  //Em vez disso, é preferível usar métodos explícitos que representem ações ou comportamentos da entidade, mantendo assim a integridade do modelo de domínio.
  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string | null): void {
    this.description = description;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  } 

  toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}