import { EntryState } from '../Interfaces/entry.interface';
import { DeleteEntryUpdate } from './deleteEntryUpdate.object';

describe('DeleteEntryUpdate', () => {
  it('should construct the correct $set object with default values', () => {
    // Arrange
    const expectedSet = {
      state: EntryState.DELETED,
      'meta.deleteDate': expect.any(Number),
    };

    // Act
    const deleteEntryUpdate = new DeleteEntryUpdate();

    // Assert
    expect(deleteEntryUpdate.$set).toEqual(expectedSet);
  });

  it('should allow custom $set object', () => {
    // Arrange
    const customSet = {
      title: 'Custom Title',
      state: EntryState.DELETED,
      'meta.deleteDate': Date.now(),
    };

    // Act
    const deleteEntryUpdate = new DeleteEntryUpdate(customSet);

    // Assert
    expect(deleteEntryUpdate.$set).toEqual(customSet);
  });
});
