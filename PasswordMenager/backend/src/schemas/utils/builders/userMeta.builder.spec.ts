import {
  IUser,
  MetaAttributeUser,
} from 'src/schemas/Interfaces/user.interface';
import { UserMetaBuilder } from './userMeta.builder';

describe('UserMetaBuilder', () => {
  it('should construct the meta object with default values', () => {
    // Arrange
    const expectedMetaObject = {
      [MetaAttributeUser.EDITDATE]: expect.any(Number),
      [MetaAttributeUser.LASTPASSWORD]: '',
    };

    // Act
    const userMetaBuilder = new UserMetaBuilder();
    const metaObject = userMetaBuilder.getMetaObject();

    // Assert
    expect(metaObject).toEqual(expectedMetaObject);
  });

  it('should construct the meta object with provided last value', () => {
    // Arrange
    const lastValue = 'password123';
    const expectedMetaObject = {
      [MetaAttributeUser.EDITDATE]: expect.any(Number),
      [MetaAttributeUser.LASTPASSWORD]: lastValue,
    };

    // Act
    const userMetaBuilder = new UserMetaBuilder().updateLastValues(lastValue);
    const metaObject = userMetaBuilder.getMetaObject();

    // Assert
    expect(metaObject).toEqual(expectedMetaObject);
  });

  it('should construct the meta object with provided fields to update', () => {
    // Arrange
    const fieldsToUpdate = MetaAttributeUser.LASTLOGIN;
    const expectedMetaObject = {
      [MetaAttributeUser.EDITDATE]: expect.any(Number),
      [fieldsToUpdate]: '',
    };

    // Act
    const userMetaBuilder = new UserMetaBuilder().updateFieldsToUpdate(
      fieldsToUpdate,
    );
    const metaObject = userMetaBuilder.getMetaObject();

    // Assert
    expect(metaObject).toEqual(expectedMetaObject);
  });

  it('should construct the meta object with fields to update based on edited DTO', () => {
    // Arrange
    const entryToEdit: Partial<IUser> = { password: 'password123' };
    const expectedMetaObject = {
      [MetaAttributeUser.EDITDATE]: expect.any(Number),
      [MetaAttributeUser.LASTPASSWORD]: entryToEdit.password,
    };

    // Act
    const userMetaBuilder = new UserMetaBuilder()
      .updateFieldToUpdatedBaseOnEditedDto(entryToEdit)
      .updateLastValues(entryToEdit.password);
    const metaObject = userMetaBuilder.getMetaObject();

    // Assert
    expect(metaObject).toEqual(expectedMetaObject);
  });
});
