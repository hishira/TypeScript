import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { EntrySchemaFileMapper } from 'src/schemas/mapper/entrySchemaFileMappre';
import { ImportEntrySchemaMapperFactory } from 'src/schemas/mapper/importEntrySchemaMapperFactory';
import { Writable } from 'stream';

type ToString = {
  toString: () => string;
};

export class WritableStream extends Writable {
  get getSavedData(): ImportEntrySchema[] {
    return this.data;
  }
  constructor(
    public readonly writeType: 'csv' | 'json',
    private readonly data: ImportEntrySchema[] = [],
    public readonly separator: string = ',',
  ) {
    super();
  }
  _write(
    chunk: ToString,
    encoding: BufferEncoding,
    callback: (error?: Error) => void,
  ): void {
    const fileContentAsString = chunk.toString();
    const csvMapper: EntrySchemaFileMapper =
      ImportEntrySchemaMapperFactory.GetEntrySchemaMapper(this.writeType, {
        fileContentAsString: fileContentAsString,
        separator: this.separator,
      });
    this.data.push(...csvMapper.getMappedImportEntries());
    callback();
  }
}
