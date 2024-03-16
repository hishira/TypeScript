import { DTO } from 'src/schemas/dto/object.interface';
import { CreateEntryBulkCommand } from './CreateEntryBulkCommand';

describe('InsertmanyEntryEvent', () => {
  it('should create an insert many entry event with an array of DTOs', () => {
    // Arrange
    const dtos: DTO[] = [{ toObject: () => ({}) }, { toObject: () => ({}) }]; // Mock array of DTOs

    // Act
    const event = new CreateEntryBulkCommand(dtos);

    // Assert
    expect(event.entriesObjects).toEqual(dtos);
  });
});
