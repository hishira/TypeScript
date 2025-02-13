import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepComponent } from '../../../../../shared/directives/abstract-step.component';
import { InputComponent } from '../../../../../shared/input/input.component';
import { RequiredDot } from '../../../../../shared/required-dot/required-dot.componen';
import { PossibleGenders } from '../create-user-modal.utils';
import { GeneralInformationStepGroup } from '../create-user-model.types';

@Component({
  selector: 'app-user-create-general-information-step',
  templateUrl: './generial-information-step.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './general-information-step.component.scss',
  imports: [
    DialogComponent,
    ButtonModule,
    InputComponent,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    RequiredDot,
  ],
})
export class GeneralInformationStep extends AbstractStepComponent<GeneralInformationStepGroup> {
  readonly genders: string[] = PossibleGenders();
}
