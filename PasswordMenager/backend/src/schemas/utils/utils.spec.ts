import { MongoDateGetter } from './utils';

describe('MongoDateGetter', () => {
  it('should return ISO string date when passed a Date object', () => {
    // Arrange
    const date = new Date('2022-03-15');

    // Act
    const result = MongoDateGetter(date);

    // Assert
    expect(result).toEqual('2022-03-15');
  });

  it('should return the input if it is not a Date object', () => {
    // Arrange
    const input = '2022-03-15';

    // Act
    const result = MongoDateGetter(input);

    // Assert
    expect(result).toEqual(input);
  });

  it('should return the input if it is an invalid date string', () => {
    // Arrange
    const input = 'invalid-date';

    // Act
    const result = MongoDateGetter(input);

    // Assert
    expect(result).toEqual(input);
  });
});
