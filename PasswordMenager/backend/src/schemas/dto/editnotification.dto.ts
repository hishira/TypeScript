import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { NotificationChannel } from '../Interfaces/notification.interface';

export class EditNotificationDTO {
  @IsString()
  @IsNotEmpty()
  readonly _id;

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
