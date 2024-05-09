import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { GroupService } from '../services/group.service';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { BaseError } from 'src/errors/bace-error';

@Controller('group')
export class GroupController {
  constructor(private readonly groupservice: GroupService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: false })) newgroup: CreateGroupDto,
    @Request() req,
  ): Promise<CreateGroupDto> {
    return this.groupservice.create(newgroup, req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/:id')
  async edit(
    @Param('id') groupId: string,
    @Body(new ValidationPipe({ transform: false })) editedGroup: EditGroupDto,
  ): Promise<IGroup> {
    return this.groupservice.editGroup(groupId, editedGroup);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('byuser')
  async get(@Request() req): Promise<GroupDto[] | BaseError> {
    return this.groupservice.getbyuser(req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete('/:id')
  async deleteByid(@Param('id') groupId: string): Promise<IGroup | boolean> {
    return this.groupservice.deleteGroup(groupId);
  }
}
