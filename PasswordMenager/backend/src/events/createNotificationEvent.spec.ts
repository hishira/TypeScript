import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { entryMock } from '../../test/mock/EntryMock';
import { CreateNotificationEvent } from './createNotificationEvent';

describe('CreateNotificationEvent', () => {
  it('should create a notification event with password expire date and entry', () => {
    // Arrange
    const passwordExpireDate = new Date('2024-03-08');
    const entry: IEntry = entryMock();

    // Act
    const event = new CreateNotificationEvent(passwordExpireDate, entry);

    // Assert
    expect(event.passwordExpireDate).toEqual(passwordExpireDate);
    expect(event.entry).toEqual(entry);
  });
});
