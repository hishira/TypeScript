import { GetAllUserQuery } from './getAllUser.queries';

describe('GetAllUserQuery', () => {
  it('should create a GetAllUserQuery instance', () => {
    // Act
    const query = new GetAllUserQuery();

    // Assert
    expect(query).toBeInstanceOf(GetAllUserQuery);
  });
});
