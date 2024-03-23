import { CsvEntry } from './csvEntry';

describe('CsvEntry', () => {
  it('should create a CsvEntry object with provided properties', () => {
    // Arrange
    const title = 'Example Title';
    const username = 'example_username';
    const password = 'example_password';
    const note = 'Example Note';

    // Act
    const csvEntry = new CsvEntry(title, username, password, note);

    // Assert
    expect(csvEntry).toBeDefined();
    expect(csvEntry.title).toBe(title);
    expect(csvEntry.username).toBe(username);
    expect(csvEntry.password).toBe(password);
    expect(csvEntry.note).toBe(note);
  });

  it('should return a string representation of the CsvEntry object', () => {
    // Arrange
    const title = 'Example Title';
    const username = 'example_username';
    const password = 'example_password';
    const note = 'Example Note';
    const csvEntry = new CsvEntry(title, username, password, note);

    // Act
    const csvString = csvEntry.toString();

    // Assert
    expect(csvString).toBeDefined();
    expect(csvString).toEqual(`${title}, ${username}, ${password}, ${note}`);
  });
});
