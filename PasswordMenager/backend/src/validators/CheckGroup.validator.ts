import {
  ArgumentMetadata,
  PipeTransform,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { GroupService } from 'src/services/group.service';

export class CheckGroupValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    return value;
  }
}
