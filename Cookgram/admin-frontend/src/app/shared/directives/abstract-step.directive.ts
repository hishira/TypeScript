import { Directive, inject, input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalService } from '../services/modal.service';
import { ToastService } from '../services/toast.service';
import { CheckType, Controlable } from './types';

@Directive()
export class AbstractStepDirective<T extends Controlable> {
  form = input.required<CheckType<T>>();

  protected dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  protected modalService: ModalService = inject(ModalService);

  private messageService: ToastService = inject(ToastService);

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
    this.modalService.nextStepChange.next();
  }
}
