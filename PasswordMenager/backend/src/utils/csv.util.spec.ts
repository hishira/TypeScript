import { CsvFile, TitleCsvHeader } from './csv.util';
import { CsvEntry } from './csvEntry';

describe('CsvFile', () => {
  let csvFile: CsvFile;
  const entry1 = new CsvEntry('Title 1', 'User 1', 'Password 1', 'Note 1');
  const entry2 = new CsvEntry('Title 2', 'User 2', 'Password 2', 'Note 2');

  beforeEach(() => {
    csvFile = new CsvFile();
  });

  it('should create a CsvFile object with empty titles and rows by default', () => {
    // Assert
    expect(csvFile).toBeDefined();
    expect(csvFile.Titles).toEqual([]);
    expect(csvFile.Rows).toEqual([]);
  });

  it('should set titles and rows correctly', () => {
    // Arrange
    const titles = [TitleCsvHeader.Title, TitleCsvHeader.Username];
    const rows = [entry1, entry2];

    // Act
    csvFile.setTiles(titles);
    csvFile.setRows(rows);

    // Assert
    expect(csvFile.Titles).toEqual(titles);
    expect(csvFile.Rows).toEqual(rows);
  });

  it('should append a row correctly', () => {
    // Arrange
    const rows = [entry1];

    // Act
    csvFile.setRows(rows);
    csvFile.appendRow(entry2);

    // Assert
    expect(csvFile.Rows).toEqual([entry1, entry2]);
  });

  it('should return CSV string representation correctly', () => {
    // Arrange
    const titles = [TitleCsvHeader.Title, TitleCsvHeader.Username];
    const rows = [entry1, entry2];
    csvFile.setTiles(titles).setRows(rows);

    // Act
    const csvString = csvFile.getCsvAsString();

    // Assert
    const expectedCsvString =
      `${titles.join(',')}${TitleCsvHeader.EndLine}` +
      `${entry1.toString()}${TitleCsvHeader.EndLine}` +
      `${entry2.toString()}${TitleCsvHeader.EndLine}`;
    expect(csvString).toEqual(expectedCsvString);
  });
});
