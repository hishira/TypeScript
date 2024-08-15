import { Component } from '@angular/core';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { AddressControl, AddressGroup } from '../create-user-model.types';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputComponent } from '../../../../../shared/input/input.component';
import { AddressCompoent } from '../../../../../shared/components/address/address.component';
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
