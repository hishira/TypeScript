import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './create-user-modal.component.html',
})
export class CreateUserModalComponent {
  constructor(private dialogRef: DynamicDialogRef) {}

  close() {
    this.dialogRef.close();
  }
}
