import { DTO } from '../dto/object.interface';

export class HistoryDTOMapper {
  static CreateHistoryDTO(userid: string): DTO {
    return new (class implements DTO {
      toObject(): Record<string, unknown> {
        return {
          userid: userid,
          groups: [],
          entities: [],
        };
      }
    })();
  }
}
