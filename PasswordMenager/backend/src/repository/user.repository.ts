import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import * as bcryptjs from 'bcryptjs';
enum UserField {
  LOGIN = 'login',
  PASSWORD = 'password',
}
enum MetaAttributeUser {
  LASTPASSWORD = 'meta.lastPassword',
  LASTLOGIN = 'meta.lastLogin',
  EDITDATE = 'meta.editDate',
}
@Injectable()
export class UserRepository implements Repository<IUser> {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}
  create(objectToSave: DTO): Promise<IUser> {
    const newUser = new this.userModel({
      ...objectToSave.toObject(),
    });
    return newUser.save();
  }

  find(option: FilterOption<unknown>): Promise<IUser[]> {
    return this.userModel.find(option.getOption()).populate('meta').exec();
  }

  findById(id: string): Promise<IUser> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  private async updateUserHandle(
    entryToEdit: Partial<IUser>,
    userInfo: IUser,
  ): Promise<Partial<IUser>> {
    let entryUser: Partial<IUser> = {};
    const metaObject = this.createUserMetaObject(entryToEdit, userInfo);
    if (UserField.PASSWORD in entryToEdit) {
      const hashesPassword = await bcryptjs.hash(entryToEdit.password, 10);
      entryUser = {
        password: hashesPassword,
        ...metaObject,
      } as unknown as Partial<IUser>;
    } else {
      entryUser = {
        login: entryToEdit.login,
        ...metaObject,
      } as unknown as Partial<IUser>;
    }
    return entryUser;
  }

  private createUserMetaObject(entryToEdit: Partial<IUser>, userInfo: IUser) {
    const filedToUpdate: MetaAttributeUser = entryToEdit.password
      ? MetaAttributeUser.LASTPASSWORD
      : MetaAttributeUser.LASTLOGIN;
    const lastValue = entryToEdit.password ? userInfo.password : userInfo.login;
    return {
      [MetaAttributeUser.EDITDATE]: Date.now(),
      [filedToUpdate]: lastValue,
    };
  }

  update(entry: Partial<IUser>): Promise<unknown> {
    return this.userModel
      .findById(entry._id)
      .exec()
      .then(async (user) => {
        // TODO: Check, not work as expected, meta should be updated on value passed by update
        const updatedPartialUser = await this.updateUserHandle(entry, user);
        return this.userModel
          .findOneAndUpdate(
            { _id: entry._id },
            {
              $set: {
                ...updatedPartialUser,
              },
            },
          )
          .then((data) => data);
      });
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    return this.userModel.deleteOne(option.getOption()).exec();
  }

  getById(): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
