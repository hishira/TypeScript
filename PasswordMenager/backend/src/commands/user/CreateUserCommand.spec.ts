import { CreateUserCommand } from './CreateUserCommand';

describe('CreateUserCommand', () => {
  it('should be instance of CreateUserCommand', () => {
    const createUserCommand = new CreateUserCommand({
      email: 'test@test.com',
      login: 'test-login',
      password: '123456',
    });
    expect(createUserCommand).toBeInstanceOf(CreateUserCommand);
  });
  it('should has createUserDto property', () => {
    const createUserCommand = new CreateUserCommand({
      email: 'test@test.com',
      login: 'test-login',
      password: '123456',
    });
    expect(createUserCommand).toHaveProperty('createUserDto');
    expect(createUserCommand.createUserDto).toBeInstanceOf(Object);
    expect(createUserCommand.createUserDto).toHaveProperty('login');
    expect(createUserCommand.createUserDto).toHaveProperty('password');
    expect(createUserCommand.createUserDto).toHaveProperty('email');
  });
});
