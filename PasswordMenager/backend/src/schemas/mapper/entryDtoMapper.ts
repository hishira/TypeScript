import { Cipher } from 'src/utils/cipher.utils';
import { IEntry } from '../Interfaces/entry.interface';
import { CreateEntryDto } from '../dto/createentry.dto';
import { EditEntryDto } from '../dto/editentry.dto';
import { DTO } from '../dto/object.interface';
import { EntrySchemaUtils, algorithm } from '../utils/Entry.schema.utils';
import { EntryBuilder } from '../utils/builders/entry.builder';

export class EntryDtoMapper {
  static encryptDtoPassword(dto: DTO): DTO {
    if (!('password' in dto)) return dto;
    if (!('userid' in dto && typeof dto.password === 'string')) return dto;
    const userid = dto.userid;
    const object = dto.toObject();
    const bs = EntrySchemaUtils.generateKeyValue(userid);
    const password = dto.password;
    const encryptedPassword = new Cipher(
      algorithm,
      bs,
      process.env.id,
    ).encryptValue(password);
    return {
      toObject: () => ({
        ...object,
        password: encryptedPassword,
      }),
    };
  }

  static CreateEntryDtoToDto(
    entryCreateDTO: CreateEntryDto,
    userid: string,
  ): DTO {
    const entryToAdd = entryCreateDTO;
    const isGroupIdEmpty = entryToAdd.groupid === '';
    let restParams: Partial<CreateEntryDto> = entryCreateDTO;
    if (isGroupIdEmpty) {
      const { groupid, ...restEntryParams } = entryToAdd;
      restParams = restEntryParams;
    }

    return new (class implements DTO {
      toObject() {
        return {
          ...(isGroupIdEmpty && restParams ? restParams : entryCreateDTO),
          userid: userid,
        };
      }
    })();
  }

  static GetPartialUpdateEntry(editEntryDTO: EditEntryDto): Partial<IEntry> {
    return new EntryBuilder()
      .updateEntryId(editEntryDTO._id)
      .setTitle(editEntryDTO.title)
      .updatePasswordWithoutHashing(editEntryDTO.password)
      .entryNoteUpdate(editEntryDTO.note)
      .setUsername(editEntryDTO.username)
      .updateUrl(editEntryDTO.url)
      .updatePasswordExpireDate(editEntryDTO.passwordExpiredDate)
      .removeMeta()
      .removeEmptyVariables()
      .getEntry();
  }
}
