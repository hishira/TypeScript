import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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
  createMany?(objects: DTO[]): Promise<unknown> {
    throw new Error('Method not implemented.');
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
  update(entry: Partial<IEvent>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  delete(option: DeleteOption<unknown>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  deleteMany?: (option: DeleteOption<unknown>) => Promise<unknown>;
  getById(): Promise<IEvent> {
    throw new Error('Method not implemented.');
  }
}
