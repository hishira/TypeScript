import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IGroup } from '../schemas/Interfaces/group.interface';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { GroupDto } from '../schemas/dto/getroup.dto';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GROUP_MODEL')
    private groupModel: Model<IGroup>,
  ) {}

  async create(
    groupcreateDTO: CreateGroupDto,
    userid: string,
  ): Promise<CreateGroupDto> {
    const createdGroup = new this.groupModel({
      name: groupcreateDTO.name,
      userid: userid,
    });
    return createdGroup.save();
  }

  async getbyuser(userid: string): Promise<GroupDto[]> {
    return this.groupModel
      .find({ userid: userid })
      .select({ name: 1, _id: 1, userid: 1 });
  }
}
