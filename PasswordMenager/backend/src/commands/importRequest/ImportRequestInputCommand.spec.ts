import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportRequestInputCommand } from './ImportRequestInputCommand';

describe('ImportRequestInputCommand', () => {
  it('should have the correct properties', () => {
    // Arrange

    // Act
    const instance = {
      _id: '12',
      userid: 'asd',
      created: new Date(),
      state: ImportRequestState.Active,
      entriesToImport: [],
    } as ImportRequestInputCommand;

    // Assert
    expect(instance).toHaveProperty('_id');
    expect(instance).toHaveProperty('userid');
    expect(instance).toHaveProperty('created');
    expect(instance).toHaveProperty('state');
    expect(instance).toHaveProperty('entriesToImport');
    expect(instance.entriesToImport).toBeInstanceOf(Array);
  });
});
