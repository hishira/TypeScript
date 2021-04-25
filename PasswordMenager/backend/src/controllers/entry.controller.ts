import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  UseGuards,
  Request,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EntryService } from '../services/entry.service';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { AuthGuard } from '@nestjs/passport';
import { CreateEntryDto } from '../schemas/dto/createentry.dto';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
@Controller('entry')
export class EntryContoller {
  constructor(private readonly entryService: EntryService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) neweentry: CreateEntryDto,
    @Request() req,
  ): Promise<IEntry> {
    console.log(neweentry);
    return this.entryService.create(neweentry, req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/bygroup/:id')
  async getbygroupid(@Param('id') groupid: string): Promise<IEntry[]> {
    return this.entryService.getbygroupid(groupid);
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
  ):Promise<EditEntryResponse> {
    console.log(editedentry);
    return this.entryService.editentry(editedentry);
  }
}
