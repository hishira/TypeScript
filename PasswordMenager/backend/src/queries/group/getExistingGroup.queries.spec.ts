import { GetExistingGroupQuery } from './getExistingGroup.queries';
import { GroupQueryInput } from './GroupQueryInput.interface';

describe('GetExistingGroupQuery', () => {
  it('should create a GetExistingGroupQuery instance with input', () => {
    // Arrange
    const groupQueryInput: GroupQueryInput = {
      // Mock GroupQueryInput properties
      id: 'group123',
      userId: 'user123',
    };

    // Act
    const query = new GetExistingGroupQuery(groupQueryInput);

    // Assert
    expect(query.groupQueryInput).toEqual(groupQueryInput);
  });
});
