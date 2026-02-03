import { Category } from "../domain/category.entity";

//AAA (Arrange, Act, Assert)
  // Arrange - Delimito o input de dados
  // Act - Executo a ação a ser testada
  // Assert - Verifico o resultado da ação

describe('Category Unit Tests', () => {
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