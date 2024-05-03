import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEntryCommand } from 'src/commands/entry/CreateEntryCommand';
import { BaseError } from 'src/errors/bace-error';
import { CreateNotificationEvent } from 'src/events/createNotificationEvent';
import { EventTypes } from 'src/events/eventTypes';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(CreateEntryCommand)
export class CreateEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<CreateEntryCommand>
{
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }
  execute(command: CreateEntryCommand): Promise<IEntry | BaseError> {
    const { userId, entrycreateDTO } = command;
    return this.repository
      .create(EntryDtoMapper.CreateEntryDtoToDto(entrycreateDTO, userId))
      .then((response: IEntry): IEntry | BaseError =>
        this.emitNotificationCreate(response),
      )
      .catch((e) => e);
  }

  private emitNotificationCreate(response: IEntry): IEntry {
    if ('message' in response) return response;
    const passwordExpireDate = response.passwordExpiredDate;
    if (passwordExpireDate === null || passwordExpireDate === undefined)
      return response;
    this.eventEmitter.emit(
      EventTypes.CreateNotification,
      new CreateNotificationEvent(passwordExpireDate, response),
    );

    return response;
  }
}
