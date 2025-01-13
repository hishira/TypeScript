import { Directive, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalService } from '../services/modal.service';
import { ToastService } from '../services/toast.service';
import { hasProperty } from '../utils';
import { CheckType, Controlable } from './types';

@Directive()
export class AbstractStepDirective<T extends Controlable = null> {
  readonly form = input.required<CheckType<T>>();
  protected readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  protected readonly modalService: ModalService = inject(ModalService);

  private readonly messageService: ToastService = inject(ToastService);

  protected showFormHasErrors(): void {
    this.messageService.showError('Errors occurs in forms');
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected back(): void {
    this.modalService.backStepChange.next();
  }

  protected next(): void {
    this.validate();
    this.modalService.nextStepChange.next();
  }

  protected validate(): void {
    const control = this.form();
    if (!hasProperty<AbstractControl>('markAllAsTouched', control)) return;
    control.markAllAsTouched();
    this.showFormHasErrors();
  }
}
