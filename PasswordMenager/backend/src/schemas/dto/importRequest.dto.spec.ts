import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { ImportRequestDto } from './importRequest.dto';

describe('ImportRequestDto', () => {
  it('should create an import request DTO with all properties', () => {
    // Arrange
    const importRequestDto = new ImportRequestDto('testUserId', [
      new ImportEntrySchema('pass1', 'user1', 'url1', 'title1', 'email1'),
      new ImportEntrySchema('pass2', 'user2', 'url2', 'title2', 'email2'),
      // Add other entries as needed
    ]);

    // Assert
    expect(importRequestDto).toBeDefined();
    expect(importRequestDto.userid).toEqual('testUserId');
    expect(importRequestDto.entriesToImport).toHaveLength(2); // Adjust the length based on the actual entries
  });

  it('should create an import request DTO with default values', () => {
    // Arrange
    const importRequestDto = new ImportRequestDto('', []);

    // Assert
    expect(importRequestDto).toBeDefined();
    expect(importRequestDto.userid).toEqual('');
    expect(importRequestDto.entriesToImport).toHaveLength(0);
  });

  // Add more test cases as needed
});
