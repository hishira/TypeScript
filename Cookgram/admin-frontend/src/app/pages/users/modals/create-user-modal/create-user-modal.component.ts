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
import { CommonModule } from '@angular/common';
import { AbstractModalDirective } from '../../../../shared/directives/abstract-modal.directive';
import { ModalService } from '../../../../shared/services/modal.service';

type ActiveUserModalIndex = 0 | 1 | 2 | 3;
@Component({
  selector: 'app-user-create-modal',
  templateUrl: './create-user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [ModalService],
  imports: [
    StepsModule,
    DialogComponent,
    ButtonModule,
    GeneralInformationStep,
    CommonModule,
  ],
})
export class CreateUserModalComponent extends AbstractModalDirective {
  generalInformationGroup: FormGroup<GeneralInformationStepGroup> =
    EmptyGeneralInformationGroup();

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
  private readonly MAX_STEP: ActiveUserModalIndex = 3;
  constructor(private dialogRef: DynamicDialogRef, modalService: ModalService) {
    super(modalService);
    this.modalService.nextStepChange.subscribe((_) => {
      this.activeIndex =
        this.activeIndex + 1 > 3
          ? this.MAX_STEP
          : ((this.activeIndex + 1) as ActiveUserModalIndex);
    });
  }

  close() {
    this.dialogRef.close();
  }

  private handleNextStepChange(): void {
    
  }
}
