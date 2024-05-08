import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { isDefined } from 'src/utils/utils';

@ValidatorConstraint({ name: 'ImportEntrySchemaValidation', async: false })
export class ImportEntrySchemaValidator
  implements ValidatorConstraintInterface
{
  validate(
    value: IEntry,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (this.isAnyOfImportFieldUndefined(value)) return false;
    return true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Error occur in ImportEntrySchema validation`;
  }

  private isAnyOfImportFieldUndefined(value: Partial<IEntry>): boolean {
    return (
      !isDefined(value) ||
      !isDefined(value?.password) ||
      !isDefined(value?.username) ||
      !isDefined(value?.url) ||
      !isDefined(value?.title) ||
      !isDefined(value?.email)
    );
  }
}
