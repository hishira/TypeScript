import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryBuilder } from 'src/schemas/utils/builders/entry.builder';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(UpdateEntryCommand)
export class UpdateEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<UpdateEntryCommand>
{
  execute(command: UpdateEntryCommand): Promise<IEntry> {
    const { input } = command;
    const entry = new EntryBuilder()
      .updateBaseOnEditEntryDto(input?.updateEntryDto)
      .updateIdIfExista(input?.id)
      .updateStateIfExists(input?.entryState)
      .getEntry();
    return this.repository.update(entry);
  }
}
