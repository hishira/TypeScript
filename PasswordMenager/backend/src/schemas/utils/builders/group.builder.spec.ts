import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { GroupBuilder } from './group.builder';

describe('GroupBuilder', () => {
  describe('metaLastNameUpdate', () => {
    it('should update the last name in the meta object', () => {
      // Arrange
      const builder = new GroupBuilder({});
      const lastName = 'Doe';

      // Act
      const result = builder.metaLastNameUpdate(lastName);

      // Assert
      expect(result).toBeInstanceOf(GroupBuilder);
      expect(result['entry']['meta.lastName']).toEqual(lastName);
    });
  });

  describe('getUpdateSetObject', () => {
    it('should return an update object with the updated entry', () => {
      // Arrange
      const entry: Partial<IGroup> = { name: 'Group A' };
      const builder = new GroupBuilder(entry);

      // Act
      const result = builder.getUpdateSetObject();

      // Assert
      expect(result).toEqual({ $set: entry });
    });

    it('should include meta fields if updated', () => {
      // Arrange
      const entry: Partial<IGroup> = { name: 'Group A' };
      const lastName = 'Doe';
      const builder = new GroupBuilder(entry).metaLastNameUpdate(lastName);

      // Act
      const result = builder.getUpdateSetObject();

      // Assert
      expect(result).toHaveProperty('$set');
      expect(result['$set']['meta.lastName']).toEqual(lastName);
    });
  });

  // Add more test cases for other methods as needed
});
