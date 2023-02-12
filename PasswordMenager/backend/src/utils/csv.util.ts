enum TitleCsvHeader {
  Title = 'title',
  Password = 'password',
  Note = 'note',
  EndLine = '\r\n',
}

export const DefaultCsvHeader = (): TitleCsvHeader[] => {
  return [
    TitleCsvHeader.Title,
    TitleCsvHeader.Password,
    TitleCsvHeader.Note,
    TitleCsvHeader.EndLine,
  ];
};

const endRow = '\r\n';

export class CsvFile {
  private _titles: TitleCsvHeader[];
  private _rows: string[][];

  get Titles(): TitleCsvHeader[] {
    return this._titles;
  }
  set Titles(value: TitleCsvHeader[]) {
    this._titles =
      value.indexOf(TitleCsvHeader.EndLine) !== -1
        ? value
        : [...value, TitleCsvHeader.EndLine];
  }

  get Rows(): string[][] {
    return this._rows;
  }

  set Rows(value: string[][]) {
    this._rows = value.map((row) => {
      return row.indexOf(endRow) !== -1 ? row : [...row, endRow];
    });
  }

  constructor(
    titles: TitleCsvHeader[] = [],
    additionalRows: string[][] = [[]],
  ) {
    this.Titles = titles;
    this.Rows = additionalRows;
  }

  setTiles(titles: TitleCsvHeader[] = []): CsvFile {
    this.Titles = titles;
    return this;
  }

  setRows(row: string[][]): CsvFile {
    this.Rows = row;
    return this;
  }
  appendRow(row: string[]): CsvFile {
    this._rows.push(row);
    return this;
  }

  setRow(rows: string[][] = [[]]) {
    this.Rows = rows;
    return this;
  }

  getCsvAsString(): string{
    const csvString = this.Titles.flat().join(',') + this.Rows.flat().join(',');
    return csvString;
  }
}
