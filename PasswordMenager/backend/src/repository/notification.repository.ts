import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';

@Injectable()
export class NotificationRepository implements Repository<INotification> {
  constructor(
    @Inject('NOTIFICATION_MODEL')
    private readonly notificationModel: Model<INotification>,
  ) {}

  create(objectToSave: DTO): Promise<INotification> {
    const createNotification = new this.notificationModel({
      ...objectToSave.toObject(),
    });

    return createNotification.save();
  }

  find(option: FilterOption<unknown>): Promise<INotification[]> {
    return this.notificationModel.find(option.getOption()).exec();
  }

  findById(id: string): Promise<INotification> {
    return this.notificationModel.findOne({ _id: id }).exec();
  }

  update(entry: Partial<INotification>): Promise<unknown> {
    throw new NotImplementedError();
  }

  delete(option: DeleteOption<unknown>): Promise<unknown> {
    return this.notificationModel.deleteOne(option.getOption()).exec();
  }

  deleteMany?: (option: DeleteOption<unknown>) => Promise<unknown>;

  getById(): Promise<INotification> {
    throw new NotImplementedError();
  }
}
