import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserErrorMessages } from 'src/errors/errors-messages/userErrorMessages';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { UserBuilder } from 'src/schemas/utils/builders/user.builder';
import {
  UserMetaBuilder,
  UserMetaLikeObject,
} from 'src/schemas/utils/builders/userMeta.builder';
import { ErrorHandler, LoggerContext } from 'src/utils/error.handlers';
import { Logger } from 'src/utils/Logger';

@Injectable()
export class UserRepository implements Repository<IUser>, LoggerContext {
  errorHandler = new ErrorHandler(this);

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    readonly logger: Logger,
  ) {}

  create(objectToSave: DTO): Promise<IUser> {
    const newUser = new this.userModel({
      ...objectToSave.toObject(),
    });
    return newUser
      .save()
      .catch((error) =>
        this.errorHandler.handle(error, UserErrorMessages.Create),
      );
  }

  find(option: FilterOption<unknown>): Promise<IUser[]> {
    return this.userModel
      .find(option.getOption())
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, UserErrorMessages.Find),
      );
  }

  findById(id: string): Promise<IUser> {
    return this.userModel
      .findById(id)
      .then((r) => r)
      .catch((error) =>
        this.errorHandler.handle(error, UserErrorMessages.FindById),
      );
  }

  update(entry: Partial<IUser>): Promise<IUser> {
    return this.userModel
      .findById(entry._id)
      .then((user) => this.updateUserHandle(entry, user))
      .then((updatedUser) =>
        this.userModel.findOneAndUpdate(
          { _id: entry._id },
          { $set: { ...updatedUser } },
          { returnDocument: 'after' },
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(error, UserErrorMessages.Update),
      );
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    return this.userModel
      .deleteOne(option.getOption())
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, UserErrorMessages.Delete),
      );
  }

  getById(): Promise<IUser> {
    throw new NotImplementedError();
  }

  private updateUserHandle(
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
    return new UserBuilder()
      .updateMetaObject(metaObject)
      .updateBasedOnUserEntry(entryToEdit)
      .then((userBuilder) => userBuilder.getUserAsPromise());
  }

  private createUserMetaObject(
    entryToEdit: Partial<IUser>,
    userInfo: IUser,
  ): UserMetaLikeObject {
    return new UserMetaBuilder()
      .updateFieldToUpdatedBaseOnEditedDto(entryToEdit)
      .updateLastValues(
        entryToEdit?.password ? userInfo.password : userInfo.login,
      )
      .getMetaObject();
  }
}
