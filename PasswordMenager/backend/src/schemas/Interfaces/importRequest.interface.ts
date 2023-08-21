import mongoose, { Document } from 'mongoose';
import { ImportRequestState } from '../importRequest.schema';
import { DTO } from '../dto/object.interface';

export class ImportRequestDto implements DTO {
  constructor(
    public userid: string,
    public entriesToImport: ImportEntrySchema[],
  ) {}
  toObject(): Record<string, unknown> {
    const { userid, entriesToImport } = this;
    return { userid, entriesToImport };
  }
}
export class ImportRequest extends Document {
  readonly userid: mongoose.Schema.Types.ObjectId;
  readonly created: Date;
  readonly entriesToImport: ImportEntrySchema[];
  readonly state: ImportRequestState;
}

export class ImportEntrySchema {
  constructor(
    public readonly password: string,
    public readonly username: string,
    public readonly url: string,
    public readonly title: string,
    public readonly email: string,
  ) {}

  static MongoDbSchema() {
    return {
      password: String,
      username: String,
      url: String,
      title: String,
      email: String,
    };
  }
}

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

type ImportEntryResponse = {
  numberOfEntriesToAdd: number;
  entiresToImport: ImportEntrySchema[];
  importRequestId: any;
};

export class ImportEntriesResponse {
  constructor(
    private readonly importEntries: ImportEntrySchema[],
    private readonly importRequest: ImportRequest,
  ) {}

  get ResponseResolve(): ImportEntryResponse {
    return {
      numberOfEntriesToAdd: this.importEntries.length,
      entiresToImport: this.importEntries.slice(0, 10),
      importRequestId: this.importRequest._id,
    };
  }
}
