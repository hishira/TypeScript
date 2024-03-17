import { Types } from 'mongoose';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { EntryBuilder } from './entry.builder';

describe('EntryBuilder', () => {
  describe('updateBaseOnEditEntryDto', () => {
    it('should update entry based on edit entry DTO', () => {
      // Arrange
      const editEntryDto: EditEntryDto = {
        title: 'Updated Title',
        username: 'Updated UserName',
        email: 'test',
        note: 'test-note',
        password: 'test-password',
        _id: new Types.ObjectId(32).toString(),
        url: 'https://www.google.com',
        passwordExpiredDate: new Date(Date.now()),
      };
      const builder = new EntryBuilder({ title: 'Original Title' });

      // Act
      const result = builder.updateBaseOnEditEntryDto(editEntryDto);

      // Assert
      expect(result.getEntry()).toEqual(editEntryDto);
    });

    it('should not update entry if edit entry DTO is undefined', () => {
      // Arrange
      const builder = new EntryBuilder({ title: 'Original Title' });

      // Act
      const result = builder.updateBaseOnEditEntryDto(undefined);

      // Assert
      expect(result.getEntry()).toEqual({ title: 'Original Title' });
    });
  });

  // Add more test cases for other methods as needed
});
