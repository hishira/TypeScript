import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from 'src/services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Get('/numberOfEntryWithNotifications')
  async entiresWithNotifications(@Request() req) {
    return this.notificationService.userNotification(req.user._id);
  }
}
