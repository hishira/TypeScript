import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { InputComponent } from '../../../../../shared/input/input.component';
import { Gender, GeneralInformationStepGroup } from '../create-user-model.types';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-user-create-general-information-step',
  templateUrl: './generial-information-step.component.html',
  standalone: true,
  imports: [
    DialogComponent,
    ButtonModule,
    InputComponent,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
  ],
})
export class GeneralInformationStep extends AbstractStepDirective<GeneralInformationStepGroup> {
  genders: string[] = Object.values(Gender);
}
