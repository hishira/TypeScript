import { FilterUserInput } from './FilterUserInput';
import { GetFilteredUserQueries } from './getFilteredUser.queries';

describe('GetFilteredUserQueries', () => {
  it('should create a GetFilteredUserQueries instance with input', () => {
    // Arrange
    const filterUserInput: FilterUserInput = {
      // Mock FilterUserInput properties
      userid: 'user123',
      login: 'test-login',
    };

    // Act
    const query = new GetFilteredUserQueries(filterUserInput);

    // Assert
    expect(query.input).toEqual(filterUserInput);
  });
});
