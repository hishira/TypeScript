import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ImportRequestDeleteCommand } from 'src/commands/importRequest/ImportRequestDeleteCommand';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { ImportRequestBuilder } from 'src/schemas/utils/builders/importRequest.builder';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(ImportRequestDeleteCommand)
export class DeleteImportRequestHandler
  extends BaseCommandHandler<ImportRequest>
  implements ICommandHandler<ImportRequestDeleteCommand>
{
  execute(
    command: ImportRequestDeleteCommand,
  ): Promise<ImportRequest | BaseError> {
    const { input } = command;
    const importRequestOption: DeleteOption = new ImportRequestBuilder()
      .setId(input._id)
      .setUserId(input.userid)
      .setCreateDate(input.created)
      .setState(input.state)
      .setEntriesToImport(input.entriesToImport)
      .getOption();
    return this.repository.delete(importRequestOption);
  }
}
