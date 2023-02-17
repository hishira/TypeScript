import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { GroupService } from '../services/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupservice: GroupService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: false })) newgroup: CreateGroupDto,
    @Request() req,
  ) {
    return this.groupservice.create(newgroup, req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('byuser')
  async get(@Request() req): Promise<GroupDto[]> {
    return this.groupservice.getbyuser(req.user._id);
  }
}
