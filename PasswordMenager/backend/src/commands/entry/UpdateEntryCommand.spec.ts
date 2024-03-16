import { EntryState } from 'src/schemas/Interfaces/entry.interface';
import { UpdateEntryCommand } from './UpdateEntryCommand';
import { UpdateEntryInput } from './UpdateEntryInput';

describe('UpdateEntryCommand', () => {
  it('should create an update entry command with input', () => {
    // Arrange
    const updateEntryInput: UpdateEntryInput = {
      id: 'entry123',
      groupId: 'group123',
      userId: 'user123',
      entryState: EntryState.ACTIVE,
      updateEntryDto: {
        _id: 'entry123',
        title: 'Updated Title',
        username: 'Updated Username',
        password: 'Updated Password',
        email: 'updated_email@example.com',
        url: 'https://updated.example.com',
        note: 'Updated Note',
        passwordExpiredDate: new Date(),
      },
    }; // Mock update entry input

    // Act
    const command = new UpdateEntryCommand(updateEntryInput);

    // Assert
    expect(command.input).toEqual(updateEntryInput);
  });
});
