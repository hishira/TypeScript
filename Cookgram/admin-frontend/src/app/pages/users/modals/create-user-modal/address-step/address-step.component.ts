import { Component } from '@angular/core';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { AddressStepGroup } from '../create-user-model.types';
@Component({
  selector: 'app-address-step',
  templateUrl: './address-step.component.html',
  standalone: true,
  imports: [DialogComponent, ButtonModule],
})
export class AddressStepComponent extends AbstractStepDirective<AddressStepGroup> {}
