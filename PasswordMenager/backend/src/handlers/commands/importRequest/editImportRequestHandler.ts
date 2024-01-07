import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ImportRequestEditCommand } from 'src/commands/importRequest/ImportRequestEditCommand';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(ImportRequestEditCommand)
export class EditImportRequestHandler
  extends BaseCommandHandler<ImportRequest>
  implements ICommandHandler<ImportRequestEditCommand>
{
  execute(command: ImportRequestEditCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
