import { FilterQuery } from 'mongoose';
import { EntryState, IEntry } from '../Interfaces/entry.interface';
import { FilterOption } from '../Interfaces/filteroption.interface';
import { ActiveEntryFilter } from './activeEntryFilter';

describe('ActiveEntryFilter', () => {
  it('should construct the correct filter options with default state', () => {
    // Arrange
    const mockFilterOption: FilterOption<FilterQuery<IEntry>> = {
      getOption: jest.fn().mockReturnValue({}),
    };

    const expectedFilter: FilterQuery<IEntry> = {
      state: EntryState.ACTIVE,
    };

    // Act
    const activeEntryFilter = new ActiveEntryFilter(mockFilterOption);

    // Assert
    expect(activeEntryFilter.Filter()).toEqual(expectedFilter);
  });

  it('should preserve custom filter options and apply default state if not provided', () => {
    // Arrange
    const customOptions = {
      key: 'value',
    };

    const mockFilterOption: FilterOption<FilterQuery<IEntry>> = {
      getOption: jest.fn().mockReturnValue(customOptions),
    };

    const expectedFilter: FilterQuery<IEntry> = {
      ...customOptions,
      state: EntryState.ACTIVE,
    };

    // Act
    const activeEntryFilter = new ActiveEntryFilter(mockFilterOption);

    // Assert
    expect(activeEntryFilter.Filter()).toEqual(expectedFilter);
  });

  it('should preserve custom state and filter options', () => {
    // Arrange
    const customOptions = {
      key: 'value',
      state: EntryState.DELETED,
    };

    const mockFilterOption: FilterOption<FilterQuery<IEntry>> = {
      getOption: jest.fn().mockReturnValue(customOptions),
    };

    const expectedFilter: FilterQuery<IEntry> = {
      ...customOptions,
    };

    // Act
    const activeEntryFilter = new ActiveEntryFilter(mockFilterOption);

    // Assert
    expect(activeEntryFilter.Filter()).toEqual(expectedFilter);
  });
});
