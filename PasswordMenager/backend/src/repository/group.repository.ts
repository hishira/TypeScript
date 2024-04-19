import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  GroupErrorMap,
  GroupModelErrorMap,
} from 'src/errors/errors-messages/groupErrorMessages';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupBuilder } from 'src/schemas/utils/builders/group.builder';
import { ErrorHandler, LoggerContext } from 'src/utils/error.handlers';
import { Logger } from 'src/utils/Logger';
@Injectable()
export class GroupRepository implements Repository<IGroup>, LoggerContext {
  errorHandler: ErrorHandler;
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<IGroup>,
    readonly logger: Logger,
  ) {
    this.errorHandler = new ErrorHandler(this);
  }

  create(objectToSave: DTO): Promise<IGroup> {
    const createdGroup = new this.groupModel({
      ...objectToSave.toObject(),
    });

    return createdGroup
      .save()
      .catch((error) => this.errorHandler.handle(error, GroupErrorMap.Create));
  }

  find(option: FilterOption<unknown>): Promise<IGroup[]> {
    return this.groupModel.find(option.getOption()).exec();
  }

  findById(id: string): Promise<IGroup> {
    return this.groupModel
      .findOne({ _id: id })
      .exec()
      .catch((error) => this.logger.error(error) === void 0 && error);
  }

  update(entry: Partial<IGroup>): Promise<IGroup> {
    return this.groupModel
      .findById(entry._id)
      .then((group) => {
        return this.groupModel
          .findByIdAndUpdate(
            { _id: entry._id },
            new GroupBuilder(entry)
              .metaLastNameUpdate(group.name)
              .getUpdateSetObject(),
            { returnDocument: 'after' },
          )
          .then((data) => data)
          .catch((error) =>
            this.errorHandler.handle(
              error,
              GroupModelErrorMap.FincByIdAndUpdate,
            ),
          );
      })
      .catch((error) => this.errorHandler.handle(error, GroupErrorMap.Update));
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    return this.groupModel
      .deleteOne(option.getOption())
      .exec()
      .catch((error) => this.errorHandler.handle(error, GroupErrorMap.Delete));
  }

  getById(): Promise<IGroup> {
    throw new NotImplementedError();
  }
}
