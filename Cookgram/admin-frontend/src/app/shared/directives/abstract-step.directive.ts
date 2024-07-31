import { Directive, inject, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Directive()
export class AbstractStepDirective<
  T extends { [key: string]: AbstractControl }
> {
  protected form = input.required<FormGroup<T>>();
  protected dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  protected cancel(): void {
    this.dialogRef.close();
  }
}
