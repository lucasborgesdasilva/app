import { jest } from '@jest/globals';
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

//AAA (Arrange, Act, Assert)
  // Arrange - Delimito o input de dados
  // Act - Executo a ação a ser testada
  // Assert - Verifico o resultado da ação

describe('Category Unit Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  })

  describe('category_id field', () => {
    const arrange = [
      {category_id: null},
      {category_id: undefined},
      {category_id: new Uuid()} 
    ];

    test.each(arrange)('id = %j', ({category_id}) => {
      const category = new Category({
        name: "Movie",
        category_id: category_id as any
      })

      expect(category.category_id).toBeInstanceOf(Uuid);
    });
  });

  test('should change name', () => {
    const category = Category.create({
      name: "Movie"
    });

    category.changeName("Movie att");
    expect(category.name).toBe("Movie att");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('should change description', () => {
    const category = Category.create({
      name: "Movie",
      description: "some description"
    });

    category.changeDescription("other description");
    expect(category.description).toBe("other description");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('should active category', () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: false
    });

    category.activate();
    expect(category.is_active).toBe(true);
  });

  test('should deactive category', () => {
    const category = Category.create({
      name: "Movie",
      description: "some description",
      is_active: true
    });

    category.deactivate();
    expect(category.is_active).toBe(false);
  });

  describe('constructor', () => {
    test('should create a category with default values', () => {
      //Arrange
      const categoryProps = {
        name: 'Movie'
      }

      //Act
      const category = new Category(categoryProps);

      //Assert
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    })
  });

  describe('create command', () => {
    test('should create a category', () => {
      //Arrange
      const categoryProps = {
        name: 'Movie'
      }

      //Act
      const category = Category.create(categoryProps);

      //Assert
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    })

    test('should create a category with all properties', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
        is_active: false
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBeFalsy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    })
  });
});

describe('Category Validator', () => {
  describe('create command', () => {
    test('should an invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })
    });
  });
});