import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isDefined } from 'src/utils/utils';

@ValidatorConstraint({ name: 'ImportEntrySchemaValidation', async: false })
export class ImportEntrySchemaValidator
  implements ValidatorConstraintInterface
{
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (!isDefined(value)) return false;
    if (!isDefined(value?.password)) return false;
    if (!isDefined(value?.username)) return false;
    if (!isDefined(value?.url)) return false;
    if (!isDefined(value?.title)) return false;
    if (!isDefined(value?.email)) return false;
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Error occur in ImportEntrySchema validation`;
  }
}
