import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { EditEntryDto } from './../schemas/dto/editentry.dto';
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

  async deletebyid(entryid: string): Promise<DeleteEntryResponse> {
    try {
      const deletedentry: IEntry = await this.entryModel.findOne({
        _id: entryid,
      });
      await this.entryModel.deleteOne({ _id: entryid });
      return { status: true, respond: deletedentry };
    } catch (e) {
      return { status: false, respond: null };
    }
  }

  async titleedit(title: string, _id: string): Promise<void> {
    await this.entryModel.updateOne({ _id: _id }, { $set: { title: title } });
  }
  async usernameedit(newusername: string, _id: string): Promise<void> {
    await this.entryModel.updateOne(
      { _id: _id },
      { $set: { username: newusername } },
    );
  }
  async passwordedit(newpassword: string, _id: string): Promise<void> {
    await this.entryModel.updateOne(
      { _id: _id },
      { $set: { password: newpassword } },
    );
  }
  async noteedit(newnote: string, _id: string): Promise<void> {
    await this.entryModel.updateOne({ _id: _id }, { $set: { note: newnote } });
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
      console.log(e);
      return { status: false, respond: null };
    }
  }
}
