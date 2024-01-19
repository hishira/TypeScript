import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import {
  CsvEntrySchemaMapper,
  EntrySchemaFileMapper,
} from 'src/schemas/mapper/jsonEntrySchemaMapper';
import { Writable } from 'stream';

type ToString = {
  toString: () => string;
};

export class WritableStream extends Writable {
  get getSavedData(): ImportEntrySchema[] {
    return this.data;
  }
  constructor(
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
    const csvMapper: EntrySchemaFileMapper = new CsvEntrySchemaMapper(
      fileContentAsString,
      this.separator,
    );
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

export class JsonWritableStream extends Writable {
  get getSavedData(): ImportEntrySchema[] {
    return this.data;
  }
  constructor(private readonly data: ImportEntrySchema[] = []) {
    super();
  }

  override _write(
    chunk: ToString,
    encoding: BufferEncoding,
    callback: (error?: Error) => void,
  ): void {
    const fileContentAsString = chunk.toString();
    const entriesfromArray = JSON.parse(fileContentAsString);
  }
}
