import { ParseFilePipeBuilder } from '@nestjs/common';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { CustomFileValidator } from 'src/validators/file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';

describe('CSVPipeBuilder', () => {
  let pipeBuilder;

  beforeEach(() => {
    pipeBuilder = new ParseFilePipeBuilder();
  });

  it('should add file type validator for csv', () => {
    const spy = jest.spyOn(pipeBuilder, 'addFileTypeValidator');
    const CSVPipeBuilder = pipeBuilder
      .addFileTypeValidator({ fileType: 'csv' })
      .build();

    expect(spy).toHaveBeenCalledWith({ fileType: 'csv' });
  });

  it('should add max size validator', () => {
    const spy = jest.spyOn(pipeBuilder, 'addMaxSizeValidator');
    const CSVPipeBuilder = pipeBuilder
      .addMaxSizeValidator({ maxSize: 10000 })
      .build();

    expect(spy).toHaveBeenCalledWith({ maxSize: 10000 });
  });

  it('should add not file validator', () => {
    const spy = jest.spyOn(pipeBuilder, 'addValidator');
    const CSVPipeBuilder = pipeBuilder
      .addValidator(new NotFileValidator())
      .build();

    expect(spy).toHaveBeenCalledWith(expect.any(NotFileValidator));
  });

  it('should add empty file validator', () => {
    const spy = jest.spyOn(pipeBuilder, 'addValidator');
    const CSVPipeBuilder = pipeBuilder
      .addValidator(new EmptyFileValidator())
      .build();

    expect(spy).toHaveBeenCalledWith(expect.any(EmptyFileValidator));
  });

  it('should add custom file validator', () => {
    const spy = jest.spyOn(pipeBuilder, 'addValidator');
    const CSVPipeBuilder = pipeBuilder
      .addValidator(new CustomFileValidator())
      .build();

    expect(spy).toHaveBeenCalledWith(expect.any(CustomFileValidator));
  });
});
