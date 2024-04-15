import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IEvent } from 'src/schemas/Interfaces/event.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

export enum EventTypes {
  Create = 'CreateEvent',
  Delete = 'DeleteEvent',
  Update = 'UpdateEvent',
  Notify = 'NotifyEvent',
  Import = 'ImportRequestEvent',
  Export = 'ExportRequestEvent',
}
@Injectable()
export class EventService {
  constructor(
    @Inject(Repository) private readonly eventRepository: Repository<IEvent>,
  ) {}

  @OnEvent(EventTypes.Create, { async: true })
  create(payload: any) {
    this.eventRepository.create({ toObject: () => ({ ...payload }) });
  }
}
