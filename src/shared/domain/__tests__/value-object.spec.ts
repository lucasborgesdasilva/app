import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  test("should be equals", () => {
    const vo1 = new StringValueObject("string value");
    const vo2 = new StringValueObject("string value");
    expect(vo1.equals(vo2)).toBe(true);

    const cvo1 = new ComplexValueObject("value1", 1);
    const cvo2 = new ComplexValueObject("value1", 1);
    expect(cvo1.equals(cvo2)).toBe(true);
  })

    test("should not be equals", () => {
    const vo1 = new StringValueObject("string value");
    const vo2 = new StringValueObject("different string value");
    expect(vo1.equals(vo2)).toBe(false);

    expect(vo1.equals(null as any)).toBe(false);
    expect(vo1.equals(undefined as any)).toBe(false);

    const cvo1 = new ComplexValueObject("value1", 1);
    const cvo2 = new ComplexValueObject("value2", 1);
    expect(cvo1.equals(cvo2)).toBe(false);

    expect(cvo1.equals(null as any)).toBe(false);
    expect(cvo1.equals(undefined as any)).toBe(false);
  })
});