import { ObjectId } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { entryMock } from '../../test/mock/EntryMock';
import { groupMock } from '../../test/mock/GroupModelMock';
import { HistoryAppendEvent } from './historyAppendEvent';

describe('HistoryAppendEvent', () => {
  describe('With array of IEntry', () => {
    it('should create a history append event with userid, array of entries, and history add type', () => {
      // Arrange
      const userId: string | ObjectId = 'userId123';
      const entries: IEntry[] = [entryMock(), entryMock()]; // Mock array of entries
      const historyAddType: 'entry' | 'group' = 'entry';

      // Act
      const event = new HistoryAppendEvent(userId, entries, historyAddType);

      // Assert
      expect(event.userid).toEqual(userId);
      expect(event.objects).toEqual(entries);
      expect(event.historyAddType).toEqual(historyAddType);
      expect(event.useridString).toEqual(String(userId));
    });
  });

  describe('With array of IGroup', () => {
    it('should create a history append event with userid, array of groups, and history add type', () => {
      // Arrange
      const userId: string | ObjectId = 'userId123';
      const groups: IGroup[] = [groupMock(), groupMock()];
      const historyAddType: 'entry' | 'group' = 'group';

      // Act
      const event = new HistoryAppendEvent(userId, groups, historyAddType);

      // Assert
      expect(event.userid).toEqual(userId);
      expect(event.objects).toEqual(groups);
      expect(event.historyAddType).toEqual(historyAddType);
      expect(event.useridString).toEqual(String(userId));
    });
  });
});
