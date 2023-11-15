import { CreateGroupDto } from 'src/schemas/dto/group.dto';

export class CreateGroupCommand {
  constructor(
    public readonly userid: string,
    public readonly groupCreateDTO: CreateGroupDto,
  ) {}
}
