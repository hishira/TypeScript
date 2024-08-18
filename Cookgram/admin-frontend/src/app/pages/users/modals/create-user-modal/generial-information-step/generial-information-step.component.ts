import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { InputComponent } from '../../../../../shared/input/input.component';
import {
  Gender,
  GeneralInformationStepGroup,
} from '../create-user-model.types';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorsComponent } from '../../../../../shared/errors/errors.component';

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
    ErrorsComponent,
  ],
})
export class GeneralInformationStep extends AbstractStepDirective<GeneralInformationStepGroup> {
  genders: string[] = Object.values(Gender);

  override next(): void {
    // this.form().markAllAsTouched()
    // if (this.form().invalid) {
    //   this.showFormHasErrors();
    //   return;
    // }
    super.next();
  }
  
}
