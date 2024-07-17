import { Directive, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
@Directive()
export class AbstractStepDirective<
  T extends { [key: string]: AbstractControl }
> {
  form = input.required<FormGroup<T>>();
}
