import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
type CreateEntry = CreateEntryDto & { userid: string };
export class EntryRepositoryUtils {
  static GetMappedDtosToProperEntryDto(dtos: DTO[]): DTO[] {
    const dtoObjects = dtos.map((a) => a.toObject() as any);
    EntryRepositoryUtils.EntryDtoGuard(dtoObjects);
    return dtoObjects.map((dto) =>
      EntryDtoMapper.CreateEntryDtoToDto(dto, dto.userid),
    );
  }

  static EntryDtoGuard(dtos: unknown[]): asserts dtos is CreateEntry[] {
    if (!this.IsProperDtosObjects(dtos))
      throw new Error(
        'Incopatabile entries, should be array and have title, username and password field',
      );
  }
  static IsProperDtosObjects(dtos): dtos is CreateEntry[] {
    return (
      Array.isArray(dtos) &&
      dtos.every((dtoObject) => {
        return EntryRepositoryUtils.IsCreateEntryObject(dtoObject);
      })
    );
  }

  static IsCreateEntryObject(object): object is CreateEntry {
    return (
      'title' in object &&
      'password' in object &&
      'username' in object &&
      'userid' in object
    );
  }
}
