enum TitleCsvHeader {
  Title = 'title',
  Username = 'username',
  Password = 'password',
  Note = 'note',
  EndLine = '\r\n',
}

export const DefaultCsvHeader = (): TitleCsvHeader[] => {
  return [
    TitleCsvHeader.Title,
    TitleCsvHeader.Username,
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

  getCsvAsString(): string {
    console.log(this.Rows.flat());
    const csvString =
      this.Titles.slice(0, this.Titles.length - 1)
        .flat()
        .join(',') +
      endRow +
      this.Rows.map((x) => x.slice(0, x.length - 1).join(',') + endRow)
        .flat()
        .filter((x) => x)
        .join('');
    return csvString;
  }
}
