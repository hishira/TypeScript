import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ImportRequestEditCommand } from 'src/commands/importRequest/ImportRequestEditCommand';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { ImportRequestBuilder } from 'src/schemas/utils/builders/importRequest.builder';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(ImportRequestEditCommand)
export class EditImportRequestHandler
  extends BaseCommandHandler<ImportRequest>
  implements ICommandHandler<ImportRequestEditCommand>
{
  execute(
    command: ImportRequestEditCommand,
  ): Promise<ImportRequest | BaseError> {
    const { input } = command;
    const partialImportRequest = new ImportRequestBuilder()
      .setId(input._id)
      .setUserId(input.userid)
      .setCreateDate(input.created)
      .setState(input.state)
      .setEntriesToImport(input.entriesToImport)
      .getPartialImportRequest();
    return this.repository.update(partialImportRequest);
  }
}
