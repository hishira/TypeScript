import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEntryBulkCommand } from 'src/commands/entry/CreateEntryBulkCommand';
import { EntryDtoMapper, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(CreateEntryBulkCommand)
export class CreateEntryBulkHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<CreateEntryBulkCommand>
{
  execute(command: CreateEntryBulkCommand): Promise<any> {
    const { entriesObjects } = command;
    const mappedDto: DTO[] = entriesObjects.map(
      EntryDtoMapper.encryptDtoPassword,
    );
    return this.repository.createMany(mappedDto);
  }
}
