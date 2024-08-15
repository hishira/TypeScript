import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { AbstractModalDirective } from '../../../../shared/directives/abstract-modal.directive';
import { ModalService } from '../../../../shared/services/modal.service';
import { AccessConfigurationStep } from './access-configuration-step/access-configuration-step.component';
import { AddressStepComponent } from './address-step/address-step.component';
import { EmptyCreateUserFormGroup } from './create-user-modal.utils';
import {
  AccessConfigurationStepGroup,
  AddressControl,
  AddressGroup,
  CreateModalGroup,
  GeneralInformationStepGroup,
} from './create-user-model.types';
import { GeneralInformationStep } from './generial-information-step/generial-information-step.component';
import { SummaryStepComponent } from "./summary-step/summary-step.component";

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
    AccessConfigurationStep,
    AddressStepComponent,
    SummaryStepComponent
],
})
export class CreateUserModalComponent extends AbstractModalDirective {
  activeIndex: ActiveUserModalIndex = 0;
  readonly createUserGroup: FormGroup<CreateModalGroup> =
    EmptyCreateUserFormGroup();
  readonly generalInformationGroup: FormGroup<GeneralInformationStepGroup> =
    this.createUserGroup.controls.generalInformation;
  readonly accessConfigurationGroup: FormGroup<AccessConfigurationStepGroup> =
    this.createUserGroup.controls.accessConfiguration;
  readonly addressGroup: FormControl<AddressControl> =
    this.createUserGroup.controls.address;
  readonly steps: MenuItem[] = [
    {
      label: 'General information',
    },
    {
      label: 'Authorization',
    },
    { label: 'Address configuration' },
    { label: 'Summary' },
  ];
  private readonly MAX_STEP: ActiveUserModalIndex = 3;
  constructor(private dialogRef: DynamicDialogRef, modalService: ModalService) {
    super(modalService);
    this.handleNextStepChange();
    this.addressGroup.valueChanges.subscribe(console.log);
  }

  close() {
    this.dialogRef.close();
  }

  private handleNextStepChange(): void {
    this.modalService.nextStepChange.subscribe((_) => {
      this.activeIndex =
        this.activeIndex + 1 > 3
          ? this.MAX_STEP
          : ((this.activeIndex + 1) as ActiveUserModalIndex);
    });
  }
}
