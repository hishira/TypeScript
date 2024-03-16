import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { CreateUserEvent } from './createUserEvent';

describe('CreateUserEvent', () => {
  it('should create a user event with create user DTO', () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      login: 'test-login',
      email: 'test-email@email.com',
      password: 'password-test',
    };

    // Act
    const event = new CreateUserEvent(createUserDto);

    // Assert
    expect(event.createUserDto).toEqual(createUserDto);
  });
});
