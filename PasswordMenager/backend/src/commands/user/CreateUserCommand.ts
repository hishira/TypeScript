import { CreateUserDto } from 'src/schemas/dto/user.dto';

export class CreateUserCommand {
  constructor(readonly createUserDto: CreateUserDto) {}
}
