import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { EditNotificationDTO } from 'src/schemas/dto/editnotification.dto';
import { NotificationService } from 'src/services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Get('/numberOfEntryWithNotifications')
  async entiresWithNotifications(@Request() req): Promise<INotification[]> {
    return this.notificationService.userNotification(req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete('/delete/:id')
  async deleteNotification(
    @Param('id') notificationId: string,
  ): Promise<INotification> {
    return this.notificationService.deleteNotification(notificationId);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/edit')
  async editNotification(
    @Body(new ValidationPipe({ transform: true }))
    editnotification: EditNotificationDTO,
  ): Promise<INotification> {
    return this.notificationService.editNotification(editnotification);
  }
}
