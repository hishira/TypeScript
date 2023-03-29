import { Injectable } from '@nestjs/common/decorators';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GroupService } from 'src/services/group.service';

@Injectable()
@ValidatorConstraint({ async: true })
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
