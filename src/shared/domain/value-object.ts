import isEqual from 'lodash/isEqual';

//Estou usando classe abstrata apenas para servir de base e não vamos instanciar diretamente.
export abstract class ValueObject {
  public equals(vo: this): boolean {
    if(vo === null || vo === undefined) {
      return false;
    }

    if(vo.constructor !== this.constructor) {
      return false;
    }

    return isEqual(vo, this);
  }
}

/* 
  Objetos de valor são objetos imutáveis, livres de efeitos colaterais e que representam um conceito do domínio.
  Eles são definidos por seus atributos e não por uma identidade única. 
*/