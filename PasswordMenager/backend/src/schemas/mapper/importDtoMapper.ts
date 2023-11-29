import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { DTO } from '../dto/object.interface';

export class ImportDTOMapper {
  static MapImportRequestsToDTO(userid: string, entry: ImportEntrySchema): DTO {
    return {
      toObject: () => ({
        title: entry.title,
        password: entry.password,
        username: entry.username,
        note: entry.email,
        userid: userid,
      }),
    };
  }
  static MapImportRequestsToDTOs(userid: string, entries: ImportEntrySchema[]) {
    return entries.map((entry) =>
      ImportDTOMapper.MapImportRequestsToDTO(userid, entry),
    );
  }
}
