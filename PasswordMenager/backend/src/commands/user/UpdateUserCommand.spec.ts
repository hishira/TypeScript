import { UpdateUserCommand } from './UpdateUserCommand';

describe('UpdateUserCommand', () => {
  it('Should be instance of UpdateUserCommand', () => {
    const updateCommand = new UpdateUserCommand('test-id-string', {
      email: 'test-email@email.com',
      login: 'test-login',
      importPassword: 'test-import-password',
      password: '123456',
    });
    expect(updateCommand).toBeInstanceOf(UpdateUserCommand);
  });
  it('Should has proper properties', () => {
    const updateCommand = new UpdateUserCommand('test-id-string', {
      email: 'test-email@email.com',
      login: 'test-login',
      importPassword: 'test-import-password',
      password: '123456',
    });
    expect(updateCommand).toHaveProperty('userId');
    expect(updateCommand).toHaveProperty('userEditDto');
    expect(updateCommand.userId).toBe('test-id-string');
    expect(updateCommand.userEditDto).toBeInstanceOf(Object);
    expect(updateCommand.userEditDto).toHaveProperty('email');
    expect(updateCommand.userEditDto).toHaveProperty('login');
    expect(updateCommand.userEditDto).toHaveProperty('password');
  });
});
