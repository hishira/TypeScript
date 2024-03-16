import { GetFilteredGroup } from './getFilteredGroup.queries';
import { GroupQueryInput } from './GroupQueryInput.interface';

describe('GetFilteredGroup', () => {
  it('should create a GetFilteredGroup instance with input', () => {
    // Arrange
    const groupQueryInput: GroupQueryInput = {
      // Mock GroupQueryInput properties
      id: 'group123',
      userId: 'user123',
    };

    // Act
    const query = new GetFilteredGroup(groupQueryInput);

    // Assert
    expect(query.groupQueryInput).toEqual(groupQueryInput);
  });
});
