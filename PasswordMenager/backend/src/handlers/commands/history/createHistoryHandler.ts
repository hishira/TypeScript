import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { BaseError } from 'src/errors/bace-error';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { HistoryDTOMapper } from 'src/schemas/mapper/historyDtoMapper';
@CommandHandler(CreateHistoryCommand)
export class CreateHisotryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  constructor(
    @Inject(Repository)
    private readonly historyRepository: Repository<IHistory>,
  ) {}
  execute(command: CreateHistoryCommand): Promise<IHistory | BaseError> {
    return this.historyRepository.create(
      HistoryDTOMapper.CreateHistoryDTO(command.userid),
    );
  }
}
