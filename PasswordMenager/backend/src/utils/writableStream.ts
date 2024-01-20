import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { CsvEntrySchemaMapper } from 'src/schemas/mapper/csvEntrySchemaMapper';
import { EntrySchemaFileMapper } from 'src/schemas/mapper/entrySchemaFileMappre';
import { JsonEntrySchemaMapper } from 'src/schemas/mapper/jsonEntrySchemaMapper';

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
      this.writeType === 'csv'
        ? new CsvEntrySchemaMapper(fileContentAsString, this.separator)
        : new JsonEntrySchemaMapper(fileContentAsString, this.separator);
    // TODO: Check
    // const fileRows = fileContentAsString.split('\r\n');
    // fileRows.forEach((csvRow) => {
    //   const values = csvRow.split(this.separator);
    //   const [name, username, password, note] = values;
    //   this.data.push(new ImportEntrySchema(password, username, name, note, ''));
    // });
    this.data.push(...csvMapper.getMappedImportEntries());
    callback();
  }
}
