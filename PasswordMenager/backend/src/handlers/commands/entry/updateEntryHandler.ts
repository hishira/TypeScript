import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { EntryBuilder } from 'src/schemas/utils/builders/entry.builder';

@CommandHandler(UpdateEntryCommand)
export class UpdateEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<UpdateEntryCommand>
{
  execute(command: UpdateEntryCommand): Promise<any> {
    const { input } = command;
    const entry = new EntryBuilder()
      .updateBaseOnEditEntryDto(input?.updateEntryDto)
      .updateIdIfExista(input?.id)
      .updateStateIfExists(input?.entryState)
      .getEntry();
    return this.repository.update(entry);
  }
}
