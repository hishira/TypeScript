import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { Component } from '@angular/core';
import { AccessConfigurationStepGroup } from '../create-user-model.types';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { InputComponent } from '../../../../../shared/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-access-configuration-step',
  templateUrl: './access-configuration-step.component.html',
  standalone: true,
  imports: [
    DialogComponent,
    InputComponent,
    ReactiveFormsModule,
    InputSwitchModule,
    TooltipModule
  ],
})
export class AccessConfigurationStep extends AbstractStepDirective<AccessConfigurationStepGroup> {}
