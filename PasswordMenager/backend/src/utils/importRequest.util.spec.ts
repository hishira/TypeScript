import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestStream } from './importRequest.util';

describe('ImportRequestStream', () => {
  it('should process CSV file stream and return import entry schemas', async () => {
    // Mock CSV data
    const csvData =
      'Title,Username,Password,Note\r\nEntry1,User1,Pass1,Note1\r\nEntry2,User2,Pass2,Note2';
    const buffer = Buffer.from(csvData);

    // Create a mock file object
    const file = {
      buffer: buffer,
    } as Express.Multer.File;

    // Create an instance of ImportRequestStream with CSV write type
    const importRequestStream = new ImportRequestStream(file, 'csv');

    // Get the promise for import entry schemas
    const importEntries = await importRequestStream.getPromise();

    // Assert that import entries are correctly parsed
    expect(importEntries).toHaveLength(3);
    expect(importEntries[1]).toEqual({
      email: '',
      password: 'Pass1',
      title: 'Note1',
      url: 'Entry1',
      username: 'User1',
    } as unknown as ImportEntrySchema);
    expect(importEntries[2]).toEqual({
      email: '',
      password: 'Pass2',
      title: 'Note2',
      url: 'Entry2',
      username: 'User2',
    } as unknown as ImportEntrySchema);
  });

  it('should process JSON file stream and return import entry schemas', async () => {
    // Mock JSON data
    const jsonData = JSON.stringify([
      { title: 'Entry1', username: 'User1', password: 'Pass1', note: 'Note1' },
      { title: 'Entry2', username: 'User2', password: 'Pass2', note: 'Note2' },
    ]);
    const buffer = Buffer.from(jsonData);

    // Create a mock file object
    const file = {
      buffer: buffer,
    } as Express.Multer.File;

    // Create an instance of ImportRequestStream with JSON write type
    const importRequestStream = new ImportRequestStream(file, 'json');

    // Get the promise for import entry schemas
    const importEntries = await importRequestStream.getPromise();

    // Assert that import entries are correctly parsed
    expect(importEntries).toHaveLength(2);
    expect(importEntries[0]).toEqual({
      email: undefined,
      password: 'Pass1',
      title: 'Entry1',
      url: undefined,
      username: 'User1',
    } as unknown as ImportEntrySchema);
    expect(importEntries[1]).toEqual({
      email: undefined,
      password: 'Pass2',
      title: 'Entry2',
      url: undefined,
      username: 'User2',
    } as unknown as ImportEntrySchema);
  });
});
