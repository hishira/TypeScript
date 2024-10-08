import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AddressCompoent } from '../../../../../shared/components/address/address.component';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { InputComponent } from '../../../../../shared/input/input.component';
import { AddressControl } from '../create-user-model.types';
@Component({
  selector: 'app-address-step',
  templateUrl: './address-step.component.html',
  standalone: true,
  imports: [
    DialogComponent,
    ButtonModule,
    ReactiveFormsModule,
    InputComponent,
    AddressCompoent,
  ],
})
export class AddressStepComponent extends AbstractStepDirective<
  FormControl<AddressControl>
> {}
