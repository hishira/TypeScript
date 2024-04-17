import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCommand } from 'src/commands/event/CreateEventCommand';
import { IEvent } from 'src/schemas/Interfaces/event.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler
  extends BaseCommandHandler<IEvent>
  implements ICommandHandler<CreateEventCommand>
{
  execute(command: CreateEventCommand): Promise<IEvent> {
    return this.repository.create({
      toObject: () => ({
        eventType: command.createEventInput.eventType,
        related_entity: command.createEventInput.relatedEnittyId,
      }),
    });
  }
}
