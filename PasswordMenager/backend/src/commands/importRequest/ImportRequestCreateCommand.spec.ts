import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestDto } from 'src/schemas/dto/importRequest.dto';
import { CreateImportRequestCommand } from './ImportRequestCreateCommand';

describe('CreateImportRequestCommand', () => {
  it('should create an import request command with all properties', () => {
    // Arrange
    const importRequestDto: ImportRequestDto = new ImportRequestDto(
      'testUserId',
      [
        new ImportEntrySchema('pass1', 'user1', 'url1', 'title1', 'email1'),
        new ImportEntrySchema('pass2', 'user2', 'url2', 'title2', 'email2'),
        // Add other entries as needed
      ],
    );

    // Act
    const command = new CreateImportRequestCommand(importRequestDto);

    // Assert
    expect(command).toBeDefined();
    expect(command.objectDto).toEqual(importRequestDto);
  });

  it('should create an import request command with default values', () => {
    // Arrange
    const importRequestDto: ImportRequestDto = new ImportRequestDto('', []);

    // Act
    const command = new CreateImportRequestCommand(importRequestDto);

    // Assert
    expect(command).toBeDefined();
    expect(command.objectDto).toEqual(importRequestDto);
  });

  // Add more test cases as needed
});
