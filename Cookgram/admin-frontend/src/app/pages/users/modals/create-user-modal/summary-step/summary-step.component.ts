import { CommonModule } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import {
  AccessConfigurationValue,
  GeneralInformationValue,
} from '../create-user-model.types';
import { AddressValue } from '../../../../../shared/components/address/types';

@Component({
  selector: 'app-create-user-summary',
  templateUrl: './summary-step.component.html',
  standalone: true,
  imports: [CommonModule, DialogComponent, ReadoOnlyComponent],
})
export class SummaryStepComponent extends AbstractStepDirective<Nullable> {
  generalFormValue: InputSignal<GeneralInformationValue> =
    input.required<GeneralInformationValue>();
  accessConfigurationValue: InputSignal<AccessConfigurationValue> =
    input.required<AccessConfigurationValue>();
  addressValue: InputSignal<AddressValue> = input.required<AddressValue>();
}
