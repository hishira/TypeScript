import { CreateUserDto } from 'src/schemas/dto/user.dto';

export class CreateUserEvent {
  constructor(readonly createUserDto: CreateUserDto) {}
}
