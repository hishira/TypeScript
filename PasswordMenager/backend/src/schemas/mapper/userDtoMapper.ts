import { DTO } from '../dto/object.interface';
import { CreateUserDto } from '../dto/user.dto';

export class UserDTOMapper {
  static GetDTOFromCreateUserDTO(userCreateDTO: CreateUserDto): DTO {
    return {
      toObject: (): Record<string, unknown> => ({
        ...userCreateDTO,
        defaultPasswordForEntries: '',
      }),
    };
  }
}
