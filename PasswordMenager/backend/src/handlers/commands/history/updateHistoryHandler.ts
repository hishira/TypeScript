import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongoose';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(UpdateHistoryCommand)
export class UpdateHistoryHandler
  extends BaseCommandHandler<IHistory>
  implements ICommandHandler<UpdateHistoryCommand>
{
  execute(command: UpdateHistoryCommand): Promise<any> {
    const { input } = command;

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
