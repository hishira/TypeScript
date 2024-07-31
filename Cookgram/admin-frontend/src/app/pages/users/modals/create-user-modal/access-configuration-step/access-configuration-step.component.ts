import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { Component } from '@angular/core';
import { AccessConfigurationStepGroup } from '../create-user-model.types';

@Component({
  selector: 'app-access-configuration-step',
  templateUrl: './access-configuration-step.component.html',
  standalone: true,
  imports: [],
})
export class AccessConfigurationStep extends AbstractStepDirective<AccessConfigurationStepGroup> {}
