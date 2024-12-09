import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AddressCompoent } from '../../../../../shared/components/address/address.component';
import { EmptyAddressRequiredMap } from '../../../../../shared/components/address/address.utils';
import { AddressRequiredMap } from '../../../../../shared/components/address/types';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { AddressControl } from '../create-user-model.types';
@Component({
  selector: 'app-address-step',
  templateUrl: './address-step.component.html',
  standalone: true,
  imports: [
    DialogComponent,
    ButtonModule,
    ReactiveFormsModule,
    AddressCompoent,
  ],
})
export class AddressStepComponent extends AbstractStepDirective<
  FormControl<AddressControl>
> {
  readonly addressMap: AddressRequiredMap = {
    ...EmptyAddressRequiredMap,
    Address: true,
    House: true,
    PostalCode: true,
    City: true,
    Country: true,
  };
}
