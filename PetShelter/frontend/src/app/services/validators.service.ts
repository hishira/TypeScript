import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorTypes } from '../models/input.model';
@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  validatorErrors: ValidationErrors | null = null;

  constructor() {}

  emailMath(emailControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key in string]: boolean } | null => {
      const parentFormGroup = control.parent as FormGroup;
      if (parentFormGroup) {
        const emailControl = parentFormGroup.get(emailControlName);
        return emailControl?.value !== control.value
          ? { [ErrorTypes.EmailMatch]: true }
          : null;
      }
      return null;
    };
  }

  required(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      this.validatorErrors = { ...this.validatorErrors, required: false };
    } else {
      this.validatorErrors = { ...this.validatorErrors, required: true };
    }
    return this.validatorErrors &&
      Object.keys(this.validatorErrors).length === 0
      ? null
      : this.validatorErrors;
  }
}
