import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';

@Injectable()
export class EntryService {
  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<IEntry>,
  ) {}

  async create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry> {
    const createdentry = new this.entryModel({
      ...entrycreateDTO,
      userid: userid,
    });
    return createdentry.save();
  }

  async getbygroupid(groupid: string): Promise<IEntry[]> {
    return this.entryModel.find({ groupid: groupid });
  }
}
