import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
import { GeneralInformationStep } from './generial-information-step/generial-information-step.component';
type ActiveUserModalIndex = 0 | 1 | 2 | 3;
@Component({
  selector: 'app-user-create-modal',
  templateUrl: './create-user-modal.component.html',
  standalone: true,
  imports: [StepsModule, DialogComponent, ButtonModule, GeneralInformationStep],
})
export class CreateUserModalComponent {
  constructor(private dialogRef: DynamicDialogRef) {}
  steps: MenuItem[] = [
    {
      label: 'General information',
    },
    { label: 'Address configuration' },
    { label: 'Summary' },
  ];
  activeIndex: ActiveUserModalIndex = 0;
  close() {
    this.dialogRef.close();
  }
}
