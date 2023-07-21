import mongoose from 'mongoose';

export class ImportRequest extends Document {
  readonly userid: mongoose.Schema.Types.ObjectId;
  readonly created: Date;
  readonly entriesToImport: ImportEntrySchema[];
}

export class ImportEntrySchema {
  constructor(
    public readonly password: string,
    public readonly username?: string,
    public readonly url?: string,
    public readonly title?: string,
    public readonly email?: string,
  ) {}
}
