import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEntryCommand } from 'src/commands/entry/CreateEntryCommand';
import { EntryDtoMapper, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { CreateEntryErrorMessage, Test } from 'src/services/entry.service';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { EventTypes } from 'src/events/eventTypes';
import { CreateNotificationEvent } from 'src/events/createNotificationEvent';

@CommandHandler(CreateEntryCommand)
export class CreateEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<CreateEntryCommand>
{
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }
  execute(command: CreateEntryCommand): Promise<any> {
    const { userId, entrycreateDTO } = command;
    return this.repository
      .create(EntryDtoMapper.CreateEntryDtoToDto(entrycreateDTO, userId))
      .then((response: Test): unknown => this.emitNotificationCreate(response))
      .catch((_) => {
        console.error(_);
        return CreateEntryErrorMessage;
      });
  }

  private emitNotificationCreate(response: Test): any {
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
