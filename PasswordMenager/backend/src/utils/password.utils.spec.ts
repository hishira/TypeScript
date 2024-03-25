import { PasswordUtils } from './password.utils';

describe('PasswordUtils', () => {
  const password = 'password123';

  it('should correctly encrypt password', async () => {
    const hashedPassword = await PasswordUtils.EncryptPassword(password);

    expect(hashedPassword).not.toBeUndefined();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword).not.toEqual(password); // Ensure the hashed password is different from the original password
  });

  it('should correctly check password hash', async () => {
    const hashedPassword = await PasswordUtils.EncryptPassword(password);

    const isMatch = await PasswordUtils.checkPasswordAndHasn(
      password,
      hashedPassword,
    );

    expect(isMatch).toBe(true);
  });

  it('should return false for incorrect password hash', async () => {
    const hashedPassword = await PasswordUtils.EncryptPassword(password);

    const isMatch = await PasswordUtils.checkPasswordAndHasn(
      'incorrectPassword',
      hashedPassword,
    );

    expect(isMatch).toBe(false);
  });
});
