import { DTO } from 'src/schemas/dto/object.interface';
import { InsertmanyEntryEvent } from './insertManyEntryEvent';

describe('InsertmanyEntryEvent', () => {
  it('should create an insert many entry event with an array of DTOs', () => {
    // Arrange
    const dtos: DTO[] = [{ toObject: () => ({}) }, { toObject: () => ({}) }]; // Mock array of DTOs

    // Act
    const event = new InsertmanyEntryEvent(dtos);

    // Assert
    expect(event.dtos).toEqual(dtos);
  });
});
