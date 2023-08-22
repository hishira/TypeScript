import { CsvEntry } from './export.utils';

enum TitleCsvHeader {
  Title = 'title',
  Username = 'username',
  Password = 'password',
  Note = 'note',
  EndLine = '\r\n',
}

//TODO: Check
export class CsvFile {
  private _titles: TitleCsvHeader[];
  private _rows: CsvEntry[];

  static DefaultCsvHeader = [
    TitleCsvHeader.Title,
    TitleCsvHeader.Username,
    TitleCsvHeader.Password,
    TitleCsvHeader.Note,
  ];
  get Titles(): TitleCsvHeader[] {
    return this._titles;
  }

  set Titles(value: TitleCsvHeader[]) {
    this._titles = value;
  }

  get Rows(): CsvEntry[] {
    return this._rows;
  }

  set Rows(value: CsvEntry[]) {
    this._rows = value;
  }

  constructor(titles: TitleCsvHeader[] = [], additionalRows: CsvEntry[] = []) {
    this.Titles = titles;
    this.Rows = additionalRows;
  }

  setTiles(titles: TitleCsvHeader[] = []): this {
    this.Titles = titles;
    return this;
  }

  setRows(row: CsvEntry[]): this {
    this.Rows = row;
    return this;
  }

  appendRow(row: CsvEntry): this {
    this._rows.push(row);
    return this;
  }

  setRow(rows: CsvEntry[] = []) {
    this.Rows = rows;
    return this;
  }

  getCsvAsString(): string {
    const csvString = this.convertHeaderToString() + this.convertRowsToString();

    return csvString;
  }

  private convertHeaderToString(): string {
    return this.Titles.flat().join(',') + TitleCsvHeader.EndLine;
  }

  private convertRowsToString(): string {
    return this.Rows.map((x) => x.toString() + TitleCsvHeader.EndLine)
      .flat()
      .filter((x) => x)
      .join('');
  }
}
