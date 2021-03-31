import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IGroup } from './schemas/Interfaces/group.interface';
import { CreateGroupDto } from './schemas/dto/group.dto';

@Injectable()
export class GroupService {
  constructor(@Inject('GROUP_MODEL') 
  private groupModel: Model<IGroup>
  ){}

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
}
