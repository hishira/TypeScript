import { Component } from '@angular/core';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from "../../../../../shared/input/input.component";
import { ReactiveFormsModule, FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-create-general-information-step',
  templateUrl: './generial-information-step.component.html',
  standalone: true,
  imports: [DialogComponent, ButtonModule, InputComponent, ReactiveFormsModule],
})

export class GeneralInformationStep {
  firstNameControl = new FormControl<string>('');
}
