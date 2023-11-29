import {
  IUser,
  MetaAttributeUser,
} from 'src/schemas/Interfaces/user.interface';

export class UserMetaBuilder {
  constructor(
    private lastValue: string = '',
    private filedsToUpdate: MetaAttributeUser = MetaAttributeUser.LASTPASSWORD,
  ) {}

  updateLastValues(lastValue: string): this {
    this.lastValue = lastValue;
    return this;
  }

  updateFieldsToUpdate(fieldsToUpdate: MetaAttributeUser): this {
    this.filedsToUpdate = fieldsToUpdate;
    return this;
  }

  updateFieldToUpdatedBaseOnEditedDto(entryToEdit: Partial<IUser>): this {
    const filedToUpdate: MetaAttributeUser = entryToEdit.password
      ? MetaAttributeUser.LASTPASSWORD
      : MetaAttributeUser.LASTLOGIN;
    this.filedsToUpdate = filedToUpdate;
    return this;
  }

  getMetaObject() {
    return {
      [MetaAttributeUser.EDITDATE]: Date.now(),
      [this.filedsToUpdate]: this.lastValue,
    };
  }
}
