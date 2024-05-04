import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateImportRequestCommand } from 'src/commands/importRequest/ImportRequestCreateCommand';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(CreateImportRequestCommand)
export class CreateImportRequestHandler
  extends BaseCommandHandler<ImportRequest>
  implements ICommandHandler<CreateImportRequestCommand>
{
  execute(
    command: CreateImportRequestCommand,
  ): Promise<ImportRequest | BaseError> {
    const { objectDto } = command;
    return this.repository.create(objectDto);
  }
}
