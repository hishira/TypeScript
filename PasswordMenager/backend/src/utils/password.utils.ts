import * as bcryptjs from 'bcryptjs';

export class PasswordUtils {
  static EncryptPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }
}
