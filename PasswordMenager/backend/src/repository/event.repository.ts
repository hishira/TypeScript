import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseError } from 'src/errors/bace-error';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { IEvent } from 'src/schemas/Interfaces/event.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

@Injectable()
export class EventRepository implements Repository<IEvent> {
  constructor(
    @Inject('EVENT_MODEL') private readonly eventModel: Model<IEvent>,
  ) {}

  create(objectToSave: DTO): Promise<IEvent> {
    const createdEvent = new this.eventModel({
      ...objectToSave.toObject(),
    });

    return createdEvent.save();
  }

  find(
    option: FilterOption<unknown>,
    paginator?: PaginatorDto,
  ): Promise<IEvent[] | { data: IEvent[]; pageInfo: Paginator }> {
    return this.eventModel.find(option.getOption).exec();
  }
  findById(id: string): Promise<IEvent> {
    return this.eventModel.findById(id).exec();
  }
  update(entry: Partial<IEvent>): Promise<IEvent> {
    throw new Error('Method not implemented.');
  }
  delete(option: DeleteOption<unknown>): Promise<IEvent | BaseError> {
    throw new Error('Method not implemented.');
  }
  deleteMany?: (option: DeleteOption<unknown>) => Promise<IEvent | BaseError  >;
  getById(): Promise<IEvent> {
    throw new Error('Method not implemented.');
  }
}
