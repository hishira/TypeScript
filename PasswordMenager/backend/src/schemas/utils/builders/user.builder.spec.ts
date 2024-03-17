import { IUser } from 'src/schemas/Interfaces/user.interface';
import { PasswordUtils } from 'src/utils/password.utils';
import { UserBuilder } from './user.builder';

describe('UserBuilder', () => {
  it('should construct a user object with default values', () => {
    // Arrange
    const expectedUser: Partial<IUser> = {};

    // Act
    const userBuilder = new UserBuilder();
    const user = userBuilder.getUser();

    // Assert
    expect(user).toEqual(expectedUser);
  });

  it('Password must match with hash', async () => {
    // Arrange
    const password = 'password123';

    // Act
    const userBuilder = await new UserBuilder().updatePassword(password);
    const user = userBuilder.getUser();
    const isSame = await PasswordUtils.checkPasswordAndHasn(
      password,
      user.password,
    );
    // Assert
    expect(isSame).toEqual(true);
  });

  it('should construct a user object with the provided login', () => {
    // Arrange
    const login = 'testuser';
    const expectedUser: Partial<IUser> = { login };

    // Act
    const userBuilder = new UserBuilder().loginUpdate(login);
    const user = userBuilder.getUser();

    // Assert
    expect(user).toEqual(expectedUser);
  });

  it('should construct a user object with the provided email', () => {
    // Arrange
    const email = 'test@example.com';
    const expectedUser: Partial<IUser> = { email };

    // Act
    const userBuilder = new UserBuilder().emailUpdate(email);
    const user = userBuilder.getUser();

    // Assert
    expect(user).toEqual(expectedUser);
  });

  it('should construct a user object with the provided default password for entries', () => {
    // Arrange
    const defaultPasswordForEntries = 'default123';
    const expectedUser: Partial<IUser> = { defaultPasswordForEntries };

    // Act
    const userBuilder = new UserBuilder().passwordForImportEntries(
      defaultPasswordForEntries,
    );
    const user = userBuilder.getUser();

    // Assert
    expect(user).toEqual(expectedUser);
  });

  it('should construct a user object with the provided meta object', () => {
    // Arrange
    const meta = { lastLogin: new Date() };
    const expectedUserMeta = meta;

    // Act
    const userBuilder = new UserBuilder().updateMetaObject(meta);
    const userMeta = userBuilder.getMetaObject();

    // Assert
    expect(userMeta).toEqual(expectedUserMeta);
  });

  // Additional tests for other methods and asynchronous password update
});
