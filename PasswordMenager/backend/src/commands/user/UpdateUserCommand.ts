import { EditUserDto } from 'src/schemas/dto/edituser.dto';

export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly userEditDto: EditUserDto,
  ) {}
}
