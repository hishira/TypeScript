import { userMock } from '../../../test/mock/UserModelMock';
import { IUser } from '../Interfaces/user.interface';
import { UserUtils } from './user.utils';

describe('UserUtils', () => {
  describe('allUserFilterOption', () => {
    it('should return an empty filter option', () => {
      // Act
      const filterOption = UserUtils.allUserFilterOption.getOption();

      // Assert
      expect(filterOption).toEqual({});
    });
  });

  describe('GetFirstUserFromTableOrNull', () => {
    it('should return null if users array is empty', () => {
      // Arrange
      const users: IUser[] = [];

      // Act
      const result = UserUtils.GetFirstUserFromTableOrNull(users);

      // Assert
      expect(result).toBeNull();
    });

    it('should return the first user if users array is not empty', () => {
      // Arrange
      const users: IUser[] = [userMock(), userMock()];

      // Act
      const result = UserUtils.GetFirstUserFromTableOrNull(users);

      // Assert
      expect(result).toEqual(users[0]);
    });
  });
});
