import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { GeneralInformationStep } from './generial-information-step/generial-information-step.component';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralInformationStepGroup } from './create-user-model.types';
import { EmptyGeneralInformationGroup } from './create-user-modal.utils';
type ActiveUserModalIndex = 0 | 1 | 2 | 3;
@Component({
  selector: 'app-user-create-modal',
  templateUrl: './create-user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StepsModule, DialogComponent, ButtonModule, GeneralInformationStep],
})
export class CreateUserModalComponent {
  constructor(private dialogRef: DynamicDialogRef) {}
  generalInformationGroup: FormGroup<GeneralInformationStepGroup> = EmptyGeneralInformationGroup();
  steps: MenuItem[] = [
    {
      label: 'General information',
    },
    {
      label: 'Authorization',
    },
    { label: 'Address configuration' },
    { label: 'Summary' },
  ];
  activeIndex: ActiveUserModalIndex = 0;
  close() {
    this.dialogRef.close();
  }
}