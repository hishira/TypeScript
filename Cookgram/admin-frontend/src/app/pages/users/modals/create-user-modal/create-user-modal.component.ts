import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import {
  CreateUserObject,
  PersonalInformation,
  UserAddress,
  UserCredentials,
} from '../../../../../api/types/user.types';
import { UserApiSerivce } from '../../../../../api/user.api';
import { AddressValue } from '../../../../shared/components/address/types';
import { Destroyer } from '../../../../shared/decorators/destroy';
import { AbstractModalDirective } from '../../../../shared/directives/abstract-modal.directive';
import { ModalService } from '../../../../shared/services/modal.service';
import { ExtractFormControl } from '../../../../shared/types/shared';
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
import { Gender } from '../../../../shared/types/enums';
import { preparePersonalInformation } from './utils';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './create-user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [ModalService],
  imports: [
    StepsModule,
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
  readonly createUserGroup: FormGroup<CreateModalGroup> =
    EmptyCreateUserFormGroup();
  readonly generalInformationGroup: FormGroup<GeneralInformationStepGroup> =
    this.createUserGroup.controls.generalInformation;
  readonly accessConfigurationGroup: FormGroup<AccessConfigurationStepGroup> =
    this.createUserGroup.controls.accessConfiguration;
  readonly addressGroup: FormControl<AddressControl> =
    this.createUserGroup.controls.address;
  readonly steps: MenuItem[] = CreateUserSteps;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    override readonly modalService: ModalService,
    private readonly userApi: UserApiSerivce
  ) {
    super(3);
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

  create() {
    this.userApi.createUser(this.prepareCreateUserObject());
  }

  close() {
    this.dialogRef.close();
  }

  private prepareCreateUserObject(): CreateUserObject {
    const {  address } =
      this.createUserGroup.value;

    return {
      credentials: this.prepareCredentials(),
      personalInformation: preparePersonalInformation(this.createUserGroup.value as ExtractFormControl<CreateModalGroup>), // TODO: Check
      address: address as UserAddress,
    };
  }

  private prepareCredentials(): Partial<UserCredentials> {
    const { accessConfiguration } = this.createUserGroup.value;

    return {
      password: accessConfiguration?.password,
      passwordIsTemporary: accessConfiguration?.temporaryPassword,
      username: accessConfiguration?.username,
    };
  }
}
