import { EntryQueryInput } from './EntryQueryInput.interface';
import { GetSpecificEntry } from './getSpecificEntry.queries';

describe('GetSpecificEntry', () => {
  it('should create a GetSpecificEntry instance with input', () => {
    // Arrange
    const entryQueryInput: EntryQueryInput = {
      // Mock EntryQueryInput properties
      id: 'entry123',
      groupId: 'group123',
      userId: 'user123',
    };

    // Act
    const query = new GetSpecificEntry(entryQueryInput);

    // Assert
    expect(query.input).toEqual(entryQueryInput);
  });
});
