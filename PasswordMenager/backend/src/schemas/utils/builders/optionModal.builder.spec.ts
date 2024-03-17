import { EntryState } from 'src/schemas/Interfaces/entry.interface';
import { OptionModelBuilder } from './optionModal.builder';

describe('OptionModelBuilder', () => {
  it('should construct filter option with default values', () => {
    // Arrange
    const expectedOption = {
      getOption: expect.any(Function),
    };

    // Act
    const optionModelBuilder = new OptionModelBuilder();

    // Assert
    expect(optionModelBuilder.getOption()).toEqual(expectedOption);
  });

  it('should construct filter option with updated entry state', () => {
    // Arrange
    const state = EntryState.ACTIVE;
    const expectedOption = {
      getOption: expect.any(Function),
    };

    // Act
    const optionModelBuilder = new OptionModelBuilder().updateStateEntry(state);

    // Assert
    expect(optionModelBuilder.getOption()).toEqual(expectedOption);
  });

  // Add more test cases for other methods as needed
});
