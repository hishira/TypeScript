import { CreateGroupDto } from '../dto/group.dto';
import { GroupDtoMapper } from './groupDtoMapper';

describe('GroupDtoMapper', () => {
  it('should create a pure group DTO', () => {
    // Arrange
    const createGroupDto: CreateGroupDto = {
      name: 'TestGroup',
    };

    // Act
    const pureGroupDTO = GroupDtoMapper.CreatePureGroupDTO(
      'testUserId',
      createGroupDto,
    );

    // Assert
    expect(pureGroupDTO).toBeDefined();
    expect(pureGroupDTO.toObject()).toEqual({
      name: 'TestGroup',
      userid: 'testUserId',
    });
  });

  // Add more test cases as needed
});
