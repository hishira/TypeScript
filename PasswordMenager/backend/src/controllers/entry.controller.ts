import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupNotExistsFilter } from 'src/errors/GroupNotExistFilter';
import { GroupGuard } from 'src/guards/GroupExists.guard';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { GroupService } from 'src/services/group.service';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { CheckGroupValidation } from 'src/validators/CheckGroup.validator';
import { CreateEntryDto } from '../schemas/dto/createentry.dto';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { EntryService } from '../services/entry.service';
@Controller('entry')
export class EntryContoller {
  constructor(
    private readonly entryService: EntryService,
    private readonly groupService: GroupService,
  ) {}

  @UseGuards(AuthGuard('accessToken'))
  @UseFilters(new GroupNotExistsFilter())
  @UseGuards(GroupGuard)
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) neweentry: CreateEntryDto,
    @Request() req,
  ): Promise<IEntry | { message: string }> {
    return this.entryService.create(neweentry, req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/bygroup/:id')
  async getbygroupid(@Param('id') groupid: string): Promise<IEntry[]> {
    return this.entryService.getbygroupid(groupid);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/:id')
  async getEntryById(@Param('id') entryId: string): Promise<IEntry> {
    return this.entryService.getById(entryId);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete('/byentityid/:id')
  async deletebyid(
    @Param('id') entityid: string,
  ): Promise<DeleteEntryResponse> {
    return this.entryService.deletebyid(entityid);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/edit')
  async editentry(
    @Body(new ValidationPipe({ transform: true })) editedentry: EditEntryDto,
    @Request() req,
  ): Promise<EditEntryResponse> {
    return this.entryService.editentry(editedentry);
  }
}
