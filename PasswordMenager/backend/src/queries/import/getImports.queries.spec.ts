import { GetImportQuery } from './getImports.queries';
import { ImportInput } from './ImportInput';

describe('GetImportQuery', () => {
  it('should create a GetImportQuery instance with input', () => {
    // Arrange
    const importInput: ImportInput = {
      // Mock ImportInput properties
      id: 'import123',
      userId: 'user123',
    };

    // Act
    const query = new GetImportQuery(importInput);

    // Assert
    expect(query.input).toEqual(importInput);
  });
});
