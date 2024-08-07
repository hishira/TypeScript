import { CreateGroupDto } from '../dto/group.dto';
import { DTO } from '../dto/object.interface';

export class GroupDtoMapper {
  static CreatePureGroupDTO(
    userid: string,
    groupcreateDTO: CreateGroupDto,
  ): DTO {
    return new (class implements DTO {
      toObject(): Record<string, unknown> {
        return {
          ...groupcreateDTO,
          userid: userid,
        };
      }
    })();
  }
}
