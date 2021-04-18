import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { EntryService } from '../services/entry.service';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { AuthGuard } from '@nestjs/passport';
import { CreateEntryDto } from '../schemas/dto/createentry.dto';
@Controller('entry')
export class EntryContoller {
  constructor(private readonly entryService: EntryService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) neweentry: CreateEntryDto,
    @Request() req,
  ): Promise<IEntry> {
    console.log(neweentry)
    return this.entryService.create(neweentry, req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/bygroup/:id')
  async getbygroupid(@Param("id") groupid:string): Promise<IEntry[]> {
    return this.entryService.getbygroupid(groupid);
  }
}
