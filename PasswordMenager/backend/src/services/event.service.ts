import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventAction, IEvent } from 'src/schemas/Interfaces/event.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@Injectable()
export class EventService {
  constructor(
    @Inject(Repository) private readonly eventRepository: Repository<IEvent>,
  ) {}

  @OnEvent(EventAction.Create, { async: true })
  create(payload: IEvent): void {
    this.eventRepository
      .create({ toObject: () => ({ ...payload }) })
      .then((r) => r);
  }
}
