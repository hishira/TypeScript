import { ImportEntrySchema } from './importRequest.interface';

describe('ImportEntrySchema', () => {
  it('should create an import entry schema with all properties', () => {
    // Arrange
    const importEntry = new ImportEntrySchema(
      'pass1',
      'user1',
      'url1',
      'title1',
      'email1',
    );

    // Assert
    expect(importEntry).toBeDefined();
    expect(importEntry.password).toEqual('pass1');
    expect(importEntry.username).toEqual('user1');
    expect(importEntry.url).toEqual('url1');
    expect(importEntry.title).toEqual('title1');
    expect(importEntry.email).toEqual('email1');
  });

  // Add more test cases as needed
});
