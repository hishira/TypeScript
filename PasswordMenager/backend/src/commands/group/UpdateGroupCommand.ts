import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';

export class UpdateGroupCommand {
  constructor(
    public readonly groupId: string,
    public readonly editGroupDTO: EditGroupDto,
  ) {}
}
