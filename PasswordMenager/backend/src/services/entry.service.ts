import { Inject, Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';
@Injectable()
export class EntryService {
  constructor(
    @Inject('ENTRY_MODEL')
    private entryModel: Model<IEntry>,
    @Inject(Repository)
    private readonly entryRepository: Repository<IEntry>,
  ) {}

  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    const createdentry = new this.entryModel({
      ...entrycreateDTO,
      userid: userid,
    });
    this.entryRepository.deleteById();
    return createdentry.save().catch((_) => {
      return { message: 'Error whice creating entry' };
    });
  }

  async getbygroupid(groupid: string): Promise<IEntry[]> {
    return this.entryModel.find({ groupid: groupid });
  }

  async deletebyid(entryid: string): Promise<DeleteEntryResponse> {
    try {
      const deletedentry: Promise<IEntry> = this.entryModel
        .findOne({
          _id: entryid,
        })
        .exec();
      const deletedPromise = this.entryModel.deleteOne({ _id: entryid }).exec();
      return Promise.all([deletedentry, deletedPromise])
        .then((res) => {
          return { status: true, respond: res[0] };
        })
        .catch((err) => {
          return {
            status: false,
            respond: null,
          };
        });
    } catch (e) {
      return { status: false, respond: null };
    }
  }

  async titleedit(title: string, _id: string): Promise<UpdateWriteOpResult> {
    return this.entryModel
      .updateOne({ _id: _id }, { $set: { title: title } })
      .then((data) => data);
  }

  async usernameedit(
    newusername: string,
    _id: string,
  ): Promise<UpdateWriteOpResult> {
    return this.entryModel
      .updateOne({ _id: _id }, { $set: { username: newusername } })
      .then((data) => data);
  }

  async passwordedit(
    newpassword: string,
    _id: string,
  ): Promise<UpdateWriteOpResult> {
    return this.entryModel
      .updateOne({ _id: _id }, { $set: { password: newpassword } })
      .then((data) => data);
  }

  async noteedit(newnote: string, _id: string): Promise<UpdateWriteOpResult> {
    return this.entryModel
      .updateOne({ _id: _id }, { $set: { note: newnote } })
      .then((data) => data);
  }

  async getByUser(userId: string): Promise<IEntry[]> {
    return this.entryModel.find({ userid: userId }).then((data) => data);
  }

  async editentry(neweditedentry: EditEntryDto): Promise<EditEntryResponse> {
    try {
      if (neweditedentry.title !== '')
        await this.titleedit(neweditedentry.title, neweditedentry._id);
      if (neweditedentry.username !== '')
        await this.usernameedit(neweditedentry.password, neweditedentry._id);
      if (neweditedentry.password !== '')
        await this.passwordedit(neweditedentry.password, neweditedentry._id);
      if (neweditedentry.note !== '')
        await this.noteedit(neweditedentry.note, neweditedentry._id);
      const upadednoew = await this.entryModel.findOne({
        _id: neweditedentry._id,
      });
      return { status: true, respond: upadednoew };
    } catch (e) {
      return { status: false, respond: null };
    }
  }
}
