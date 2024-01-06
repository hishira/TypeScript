import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ImportRequestDeleteCommand } from 'src/commands/importRequest/ImportRequestDeleteCommand.1';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(ImportRequestDeleteCommand)
export class DeleteImportRequestHandler
  extends BaseCommandHandler<ImportRequest>
  implements ICommandHandler<ImportRequestDeleteCommand>
{
  execute(command: ImportRequestDeleteCommand): Promise<any> {
    const { input } = command;
    return this.repository.delete({ getOption: () => input });
  }
}
