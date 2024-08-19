import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { Subscription } from 'rxjs';
import { AddressValue } from '../../../../shared/components/address/types';
import { Destroyer } from '../../../../shared/decorators/destroy';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { AbstractModalDirective } from '../../../../shared/directives/abstract-modal.directive';
import { ModalService } from '../../../../shared/services/modal.service';
import { AccessConfigurationStep } from './access-configuration-step/access-configuration-step.component';
import { AddressStepComponent } from './address-step/address-step.component';
import { CreateUserSteps } from './create-user-modal.consts';
import { EmptyCreateUserFormGroup } from './create-user-modal.utils';
import {
  AccessConfigurationStepGroup,
  AccessConfigurationValue,
  AddressControl,
  CreateModalGroup,
  GeneralInformationStepGroup,
  GeneralInformationValue,
} from './create-user-model.types';
import { GeneralInformationStep } from './generial-information-step/generial-information-step.component';
import { SummaryStepComponent } from './summary-step/summary-step.component';

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
    SummaryStepComponent,
  ],
})
@Destroyer()
export class CreateUserModalComponent extends AbstractModalDirective {
  activeIndex: ActiveUserModalIndex = 0;
  private readonly subscription = new Subscription();
  readonly createUserGroup: FormGroup<CreateModalGroup> =
    EmptyCreateUserFormGroup();
  readonly generalInformationGroup: FormGroup<GeneralInformationStepGroup> =
    this.createUserGroup.controls.generalInformation;
  readonly accessConfigurationGroup: FormGroup<AccessConfigurationStepGroup> =
    this.createUserGroup.controls.accessConfiguration;
  readonly addressGroup: FormControl<AddressControl> =
    this.createUserGroup.controls.address;
  readonly steps: MenuItem[] = CreateUserSteps;
  private readonly MAX_STEP: ActiveUserModalIndex = 3;

  constructor(private dialogRef: DynamicDialogRef, modalService: ModalService) {
    super(modalService);
    this.handleNextStepChange();
    this.handleBackStepChange();
    this.addressGroup.valueChanges.subscribe(console.log);
  }
  get GeneralInformationValue(): GeneralInformationValue {
    return this.generalInformationGroup.value as GeneralInformationValue;
  }

  get AccessConfigurationValue(): AccessConfigurationValue {
    return this.accessConfigurationGroup.value as AccessConfigurationValue;
  }

  get AddressValue(): AddressValue {
    return this.addressGroup.value;
  }

  close() {
    this.dialogRef.close();
  }

  private handleNextStepChange(): void {
    this.subscription.add(
      this.modalService.nextStepChange.subscribe((_) => {
        this.activeIndex =
          this.activeIndex + 1 > 3
            ? this.MAX_STEP
            : ((this.activeIndex + 1) as ActiveUserModalIndex);
      })
    );
  }

  private handleBackStepChange(): void {
    this.subscription?.add(
      this.modalService.backStepChange.subscribe((_) => {
        this.activeIndex =
          this.activeIndex - 1 <= 0
            ? 0
            : ((this.activeIndex - 1) as ActiveUserModalIndex);
      })
    );
  }
}
