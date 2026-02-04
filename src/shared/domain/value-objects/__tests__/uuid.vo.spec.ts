import { jest } from '@jest/globals';
import { validate as uuidValidate } from 'uuid';
import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('UUid Unit Tests', () => {
  // Espiando o método validate para garantir que ele seja chamado durante a construção do objeto Uuid. Ele é um mock.
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid('invalid-uuid');
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);

  });

  test("should create a valid uuid when provided", () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    const uuid = new Uuid(validUuid);
    expect(uuid.id).toBe(validUuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});