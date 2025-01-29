import { CommonModule } from '@angular/common';
import { Component, InputSignal, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AddressValue } from '../../../../../shared/components/address/types';
import { ReadoOnlyComponent } from '../../../../../shared/components/readonly-only/readonly-only.component';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import {
  AccessConfigurationValue,
  GeneralInformationValue,
} from '../create-user-model.types';

@Component({
  selector: 'app-create-user-summary',
  templateUrl: './summary-step.component.html',
  standalone: true,
  imports: [CommonModule, DialogComponent, ReadoOnlyComponent, ButtonModule],
})
export class SummaryStepComponent extends AbstractStepDirective {
  readonly generalFormValue: InputSignal<GeneralInformationValue> =
    input.required<GeneralInformationValue>();
  readonly accessConfigurationValue: InputSignal<AccessConfigurationValue> =
    input.required<AccessConfigurationValue>();
  readonly addressValue: InputSignal<AddressValue> =
    input.required<AddressValue>();

  readonly createEvent = output<void>();
  
  create(): void {
    this.createEvent.emit();
  }
}
