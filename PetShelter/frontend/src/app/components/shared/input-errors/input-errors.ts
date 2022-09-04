import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessages, ErrorTypes } from 'src/app/models/input.model';
@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.html',
})
export class InputErrorsComponent {
  @Input() errors: ValidationErrors | null;

  get arrayErrors() {
    console.log(this.errors && Object.keys(this.errors).map((key) => ErrorMessages[key as ErrorTypes]))
    return this.errors
      ? Object.keys(this.errors).map((key) => ErrorMessages[key as ErrorTypes])
      : [];
  }
  constructor() {}
}
