import { ParseFilePipeBuilder } from '@nestjs/common';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { JSONFileValidator } from 'src/validators/json.file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';
import { JSONPipeBuilder } from './jsonFile.builder';

describe('ParseFilePipeBuilder', () => {
  it('should construct JSON pipe with validators', () => {
    // Arrange

    // Act
    const jsonPipe = JSONPipeBuilder;

    // Assert
    expect(jsonPipe).toBeDefined();
  });
});
