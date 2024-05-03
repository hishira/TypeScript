import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  GroupErrorMap,
  GroupModelErrorMap,
} from 'src/errors/errors-messages/groupErrorMessages';
import { GroupError } from 'src/errors/group/group-error';
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

  create(objectToSave: DTO): Promise<IGroup | GroupError> {
    const createdGroup = new this.groupModel({
      ...objectToSave.toObject(),
    });

    return createdGroup
      .save()
      .catch((error) =>
        this.errorHandler.handle(new GroupError(error), GroupErrorMap.Create),
      );
  }

  find(option: FilterOption<unknown>): Promise<IGroup[] | GroupError> {
    return this.groupModel
      .find(option.getOption())
      .exec()
      .catch((error) => new GroupError(error));
  }

  findById(id: string): Promise<IGroup | GroupError> {
    return this.groupModel
      .findOne({ _id: id })
      .exec()
      .catch(
        (error) => this.logger.error(error) === void 0 && new GroupError(error),
      );
  }

  update(entry: Partial<IGroup>): Promise<IGroup | GroupError> {
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
      .catch((error) =>
        this.errorHandler.handle(new GroupError(error), GroupErrorMap.Update),
      );
  }

  delete(option: DeleteOption<unknown>): Promise<IGroup | GroupError> {
    return this.groupModel
      .findOneAndDelete(option.getOption())
      .exec()
      .catch((error) =>
        this.errorHandler.handle(new GroupError(error), GroupErrorMap.Delete),
      );
  }

  getById(): Promise<IGroup> {
    throw new NotImplementedError();
  }
}
