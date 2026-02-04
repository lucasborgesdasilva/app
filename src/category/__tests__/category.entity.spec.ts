import { Category } from "../domain/category.entity";

//AAA (Arrange, Act, Assert)
  // Arrange - Delimito o input de dados
  // Act - Executo a ação a ser testada
  // Assert - Verifico o resultado da ação

describe('Category Unit Tests', () => {
  test('should change name', () => {
    const category = Category.create({
      name: "Movie"
    });

    category.changeName("Movie att");
    expect(category.name).toBe("Movie att");
  });

  test('should change description', () => {
    const category = Category.create({
      name: "Movie",
      description: "some description"
    });

    category.changeDescription("other description");
    expect(category.description).toBe("other description");
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
      expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    })

    test('should create a category with all properties', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
        is_active: false
      });

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBeFalsy();
    })
  });
});