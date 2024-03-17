import * as bcryptjs from 'bcryptjs';

export class PasswordUtils {
  static EncryptPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  static checkPasswordAndHasn(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, hash);
  }
}
