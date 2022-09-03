import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  validatorErrors: ValidationErrors | null = null;

  constructor() {}

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
