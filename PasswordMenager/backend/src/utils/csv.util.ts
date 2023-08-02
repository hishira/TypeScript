import { CsvEntry } from 'src/services/export.service';

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
  private _rows: string[][] | CsvEntry[][];

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

  get Rows(): CsvEntry[][] | string[][] {
    return this._rows;
  }

  set Rows(value: CsvEntry[][] | string[][]) {
    this._rows = value;
  }

  constructor(
    titles: TitleCsvHeader[] = [],
    additionalRows: CsvEntry[][] | string[][] = [[]],
  ) {
    this.Titles = titles;
    this.Rows = additionalRows;
  }

  setTiles(titles: TitleCsvHeader[] = []): CsvFile {
    this.Titles = titles;
    return this;
  }

  setRows(row: CsvEntry[][] | string[][]): CsvFile {
    this.Rows = row;
    return this;
  }

  appendRow(row: CsvEntry[] | string[] = []): CsvFile {
    this._rows.push(row as unknown as any);
    return this;
  }

  setRow(rows: string[][] | CsvEntry[][] = [[]]) {
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
    return this.Rows.map((x) => x.join(',') + TitleCsvHeader.EndLine)
      .flat()
      .filter((x) => x)
      .join('');
  }
}
