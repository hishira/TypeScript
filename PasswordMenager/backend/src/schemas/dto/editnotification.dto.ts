import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationChannel } from '../Interfaces/notification.interface';

export class EditNotificationDTO {
  @IsString()
  @IsDate()
  @IsOptional()
  readonly notficationDate?;

  @IsEnum(NotificationChannel)
  @IsOptional()
  readonly notificationChannel?;

  @IsBoolean()
  @IsOptional()
  readonly active?;
}
