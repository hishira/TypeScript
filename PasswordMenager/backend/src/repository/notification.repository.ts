import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { BaseError } from 'src/errors/bace-error';
import { NotificationErrorMessages } from 'src/errors/errors-messages/notificationErrorMessages';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { Logger } from 'src/utils/Logger';
import { ErrorHandler, LoggerContext } from 'src/utils/error.handlers';

@Injectable()
export class NotificationRepository
  implements Repository<INotification>, LoggerContext
{
  errorHandler: ErrorHandler = new ErrorHandler(this);
  constructor(
    @Inject('NOTIFICATION_MODEL')
    private readonly notificationModel: Model<INotification>,
    readonly logger: Logger,
  ) {}

  create(objectToSave: DTO): Promise<INotification> {
    const createNotification = new this.notificationModel({
      ...objectToSave.toObject(),
    });

    return createNotification
      .save()
      .catch((error) =>
        this.errorHandler.handle(error, NotificationErrorMessages.Create),
      );
  }

  find(option: FilterOption<unknown>): Promise<INotification[]> {
    return this.notificationModel
      .find(option.getOption())
      .populate('entryId')
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, NotificationErrorMessages.Find),
      );
  }

  findById(id: string): Promise<INotification> {
    return this.notificationModel
      .findOne({ _id: id })
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, NotificationErrorMessages.FindById),
      );
  }

  update(entry: Partial<INotification>): Promise<INotification> {
    return this.notificationModel
      .findOneAndUpdate(
        { _id: entry._id },
        { $set: { ...entry } },
        { returnDocument: 'after' },
      )
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, NotificationErrorMessages.Update),
      );
  }

  delete(option: DeleteOption<unknown>): Promise<INotification | BaseError> {
    return this.notificationModel
      .deleteOne(option.getOption())
      .exec()
      .catch((error) =>
        this.errorHandler.handle(error, NotificationErrorMessages.Delete),
      );
  }

  deleteMany?: (
    option: DeleteOption<unknown>,
  ) => Promise<INotification | BaseError>;

  getById(): Promise<INotification> {
    throw new NotImplementedError();
  }
}
