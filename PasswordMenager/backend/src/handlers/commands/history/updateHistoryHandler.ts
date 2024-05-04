import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { HistoryBuilder } from 'src/schemas/utils/builders/history.builder';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(UpdateHistoryCommand)
export class UpdateHistoryHandler
  extends BaseCommandHandler<IHistory>
  implements ICommandHandler<UpdateHistoryCommand>
{
  execute(command: UpdateHistoryCommand): Promise<IHistory | BaseError> {
    const { input } = command;

    const partialHistory: Partial<IHistory> = new HistoryBuilder()
      .updateEntries(input.entries)
      .updateGroups(input.groups)
      .updateUserId(input.userId)
      .getPartialHistory();

    return this.repository.update(partialHistory);
  }
}
