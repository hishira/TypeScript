import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEntryBulkCommand } from 'src/commands/entry/CreateEntryBulkCommand';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(CreateEntryBulkCommand)
export class CreateEntryBulkHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<CreateEntryBulkCommand>
{
  execute(command: CreateEntryBulkCommand): Promise<IEntry[]> {
    const { entriesObjects } = command;
    const mappedDto: DTO[] = entriesObjects.map(
      EntryDtoMapper.encryptDtoPassword,
    );
    console.log('After decryption ');
    mappedDto.forEach((val) => console.log(val.toObject()));
    return this.repository.createMany(mappedDto);
  }
}
