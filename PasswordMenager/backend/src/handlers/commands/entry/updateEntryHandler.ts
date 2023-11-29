import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(UpdateEntryCommand)
export class UpdateEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<UpdateEntryCommand>
{
  execute(command: UpdateEntryCommand): Promise<any> {
    const { input } = command;
    //TODO: Fix, refactor
    if ('updateEntryDto' in input) {
      const entry: Partial<IEntry> = EntryDtoMapper.GetPartialUpdateEntry(
        input.updateEntryDto,
      );
      return this.repository.update(entry);
    }
    if ('id' in input && 'entryState' in input) {
      return this.repository.update({
        _id: input.id,
        state: input.entryState,
      });
    }
  }
}
