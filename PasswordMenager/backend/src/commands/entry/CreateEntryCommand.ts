import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';

export class CreateEntryCommand {
  constructor(
    public readonly userId: string,
    public readonly entrycreateDTO: CreateEntryDto,
  ) {}
}
