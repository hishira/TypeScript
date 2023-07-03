import { Injectable } from '@nestjs/common';
import { NotImplementedError } from 'src/errors/NotImplemented';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';

@Injectable()
export class NotificationRepository implements Repository<INotification> {
  create(objectToSave: DTO): Promise<INotification> {
    throw new NotImplementedError();
  }
  find(option: FilterOption<unknown>): Promise<INotification[]> {
    throw new NotImplementedError();
  }
  findById(id: string): Promise<INotification> {
    throw new NotImplementedError();
  }
  update(entry: Partial<INotification>): Promise<unknown> {
    throw new NotImplementedError();
  }
  delete(option: DeleteOption<unknown>): Promise<unknown> {
    throw new NotImplementedError();
  }
  deleteMany?: (option: DeleteOption<unknown>) => Promise<unknown>;
  getById(): Promise<INotification> {
    throw new NotImplementedError();
  }
}
