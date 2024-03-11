import { CreateGroupDto } from './group.dto';

describe('CreateGroupDto', () => {
  it('should create a create group DTO', () => {
    // Arrange
    const createGroupDto: CreateGroupDto = { name: 'test' };

    // Assert
    expect(createGroupDto).toBeDefined();
    expect(createGroupDto.name).toEqual('test');
  });

  // Add more test cases as needed
});
