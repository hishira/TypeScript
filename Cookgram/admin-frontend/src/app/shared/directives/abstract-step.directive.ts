import { Directive, inject, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalService } from '../services/modal.service';
import { ToastService } from '../services/toast.service';
@Directive()
export class AbstractStepDirective<
  T extends { [key: string]: AbstractControl }
> {
  form = input.required<FormGroup<T>>();
  protected dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  protected modalService: ModalService = inject(ModalService);
  private messageService: ToastService = inject(ToastService);

  protected showFormHasErrors(): void {
    this.messageService.showError('Errors occurs in forms');
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected next() {
    this.modalService.nextStepChange.next();
  }
}
