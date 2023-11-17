import { Inject } from '@nestjs/common';
import { Document } from 'mongoose';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

export class BaseCommandHandler<T extends Document> {
  @Inject(Repository)
  protected readonly repository: Repository<T>;
}
