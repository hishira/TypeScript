import { Inject, Injectable } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GroupService } from 'src/services/group.service';

@Injectable()
@ValidatorConstraint({ name: 'GroupExists', async: true })
export class GroupExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly groupService: GroupService) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    return this.groupService.checkIfexists(value).then((_) => true);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Group not exists';
  }
}
