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
import { FindEntryInput } from 'src/handlers/queries/entry/entriesFindInput';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { EntryData, IEntry } from '../schemas/Interfaces/entry.interface';
import { CreateEntryDto } from '../schemas/dto/createentry.dto';
import { EntryService } from '../services/entry.service';

@Controller('entry')
export class EntryContoller {
  constructor(private readonly entryService: EntryService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Post('/create')
  async create(
    @Body(new ValidationPipe({ transform: true })) neweentry: CreateEntryDto,
    @Request() req,
  ): Promise<unknown> {
    return this.entryService.create(neweentry, req.user._id).catch();
  }

  @UseGuards(AuthGuard('accessToken'))
  @Post('/getby')
  async getByGroup(
    @Request() req,
    @Body(new ValidationPipe({ transform: true }))
    findEntriesField?: FindEntryInput,
  ): Promise<IEntry[] | EntryData> {
    return this.entryService.getUserEntriesBy(req.user._id, findEntriesField);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/lastDeleted')
  async getLastDeletedEntries(@Request() req): Promise<IEntry[] | EntryData> {
    return this.entryService.getLastDeletedUserEntries(req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/activateEntry')
  async activateDeletedEntries(
    @Body(new ValidationPipe({ transform: true }))
    entryIdObject: Pick<EditEntryDto, '_id'>,
  ) {
    return this.entryService.activateDeletedEntreis(entryIdObject._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete('/byentityid/:id')
  async deletebyid(
    @Param('id') entityid: string,
  ): Promise<DeleteEntryResponse<IEntry>> {
    return this.entryService.deletebyid(entityid);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/edit')
  async editentry(
    @Body(new ValidationPipe({ transform: true })) editedentry: EditEntryDto,
    @Request() req,
  ): Promise<EditEntryResponse<IEntry>> {
    return this.entryService.editentry(editedentry);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/:id')
  async getEntryById(@Param('id') entryId: string): Promise<IEntry> {
    return this.entryService.getById(entryId);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Post('/restore')
  async restoreEntry(
    @Body(new ValidationPipe({ transform: false }))
    restoreBody: {
      entryId: string;
    },
  ) {
    return this.entryService.restoreEntry(restoreBody);
  }
}
