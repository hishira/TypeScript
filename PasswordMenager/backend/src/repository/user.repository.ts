import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  IUser,
  UserBuilder,
  UserMetaBuilder,
} from 'src/schemas/Interfaces/user.interface';

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
    return this.userModel.find(option.getOption()).exec();
  }

  findById(id: string): Promise<IUser> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(entry: Partial<IUser>): Promise<unknown> {
    return this.userModel
      .findById(entry._id)
      .exec()
      .then(async (user) => {
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
    throw new NotImplementedError();
  }

  private async updateUserHandle(
    entryToEdit: Partial<IUser>,
    userInfo: IUser,
  ): Promise<Partial<IUser>> {
    const metaObject = this.createUserMetaObject(entryToEdit, userInfo);
    return this.createUserObject(entryToEdit, metaObject);
  }

  private async createUserObject(
    entryToEdit: Partial<IUser>,
    metaObject,
  ): Promise<Partial<IUser>> {
    //TODO: Check if work
    return new UserBuilder()
      .updateMetaObject(metaObject)
      .updateBasedOnUserEntry(entryToEdit)
      .then((userBuilder) => userBuilder.getUserAsPromise());
  }

  private createUserMetaObject(entryToEdit: Partial<IUser>, userInfo: IUser) {
    return new UserMetaBuilder()
      .updateFieldToUpdatedBaseOnEditedDto(entryToEdit)
      .updateLastValues(
        entryToEdit.password ? userInfo.password : userInfo.login,
      )
      .getMetaObject();
  }
}
