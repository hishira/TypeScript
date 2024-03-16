import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { CreateEntryCommand } from './CreateEntryCommand';

describe('CreateEntryCommand', () => {
  it('should create a create entry command with userId and entrycreateDTO', () => {
    // Arrange
    const userId = 'user123';
    const entryCreateDTO: CreateEntryDto = {
      // Mock create entry DTO properties
      title: 'Entry Title',
      username: 'username123',
      password: 'password123',
      email: 'email@example.com',
      url: 'https://example.com',
      note: 'Entry note',
      groupid: 'test',
      toObject: () => ({}),
      passwordExpiredDate: new Date(),
    };

    // Act
    const command = new CreateEntryCommand(userId, entryCreateDTO);

    // Assert
    expect(command.userId).toEqual(userId);
    expect(command.entrycreateDTO).toEqual(entryCreateDTO);
  });
});
