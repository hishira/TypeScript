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
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupNotExistsFilter } from 'src/errors/GroupNotExistFilter';
import { GroupGuard } from 'src/guards/GroupExists.guard';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { CreateEntryDto } from '../schemas/dto/createentry.dto';
import { EntryService } from '../services/entry.service';
import { NotificationService } from 'src/services/notification.service';
import { NotificationChannel } from 'src/schemas/Interfaces/notification.interface';
import { Logger } from 'src/utils/Logger';
@Controller('entry')
export class EntryContoller {
  constructor(
    private readonly entryService: EntryService,
    private readonly notificationService: NotificationService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext('EntryController');
  }

  @UseGuards(AuthGuard('accessToken'))
  @UseFilters(new GroupNotExistsFilter())
  @UseGuards(GroupGuard)
  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) neweentry: CreateEntryDto,
    @Request() req,
  ): Promise<unknown> {
    return this.entryService
      .create(neweentry, req.user._id)
      .then((response: any) => {
        if ('message' in response) return response;
        const passwordExpireDate = response.passwordExpiredDate;
        console.log('Password expire date: ', passwordExpireDate);
        if (passwordExpireDate)
          return this.notificationService
            .create({
              entryId: response._id,
              notificationDate: passwordExpireDate,
              notificationChannel: NotificationChannel.Email,
              toObject() {
                return {
                  entryId: response._id,
                  notificationDate: passwordExpireDate,
                  notificationChannel: NotificationChannel.Email,
                };
              },
            })
            .then(async () => {
              this.logger.logMessage(
                `Notification created for date ${passwordExpireDate}`,
              );
              return this.notificationService.notificationSend();
            });
        return response;
      })
      .catch();
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/bygroup/:id')
  async getbygroupid(@Param('id') groupid: string): Promise<IEntry[]> {
    return this.entryService.getbygroupid(groupid);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('/bygroup')
  async getByGroup(@Request() req): Promise<IEntry[]> {
    return this.entryService.getUserEntriesWithoutGroup(req.user._id);
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
