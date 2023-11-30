import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongoose';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { HistoryBuilder } from 'src/schemas/utils/builders/history.builder';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(UpdateHistoryCommand)
export class UpdateHistoryHandler
  extends BaseCommandHandler<IHistory>
  implements ICommandHandler<UpdateHistoryCommand>
{
  execute(command: UpdateHistoryCommand): Promise<any> {
    const { input } = command;
    //TODO: Refactor
    const partialHistory: Partial<IHistory> = new HistoryBuilder()
      .updateEntries(input.entries)
      .updateGroups(input.groups)
      .updateUserId(input.userId)
      .getPartialHistory();
    if ('entries' in input) {
      return this.repository.update({
        userid: input.userId as unknown as ObjectId,
        entities: [...input.entries],
      });
    }
    if ('groups' in input) {
      return this.repository.update({
        userid: input.userId as unknown as ObjectId,
        groups: [...input.groups],
      });
    }
  }
}
