import { GroupNotExists } from 'src/errors/GroupNotExists.error';
import { groupMock } from '../../../test/mock/GroupModelMock';
import { IGroup } from '../Interfaces/group.interface';
import { GroupUtils } from './group.utils';

describe('GroupUtils', () => {
  describe('EmptyGroupGuard', () => {
    it('should throw GroupNotExists error if group is null', () => {
      // Arrange
      const group: IGroup | null = null;

      // Act & Assert
      expect(() => GroupUtils.EmptyGroupGuard(group)).toThrow(GroupNotExists);
    });

    it('should throw GroupNotExists error if group is undefined', () => {
      // Arrange
      const group: IGroup | undefined = undefined;

      // Act & Assert
      expect(() => GroupUtils.EmptyGroupGuard(group)).toThrow(GroupNotExists);
    });

    it('should return group if group is not null or undefined', () => {
      // Arrange
      const group: IGroup = groupMock();

      // Act
      const result = GroupUtils.EmptyGroupGuard(group);

      // Assert
      expect(result).toEqual(group);
    });
  });
});
