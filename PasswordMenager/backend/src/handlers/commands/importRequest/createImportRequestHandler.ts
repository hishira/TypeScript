import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateImportRequestCommand } from 'src/commands/importRequest/ImportRequestCreateCommand';

@CommandHandler(CreateImportRequestCommand)
export class CreateImportRequestHandler
  extends BaseCommandHandler<ImportRequest>
  implements ICommandHandler<CreateImportRequestCommand>
{
  execute(command: CreateImportRequestCommand): Promise<any> {
    const { objectDto } = command;
    return this.repository.create(objectDto);
  }
}
