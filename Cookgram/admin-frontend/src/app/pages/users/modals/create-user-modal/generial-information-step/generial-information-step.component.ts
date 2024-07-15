import { Component } from '@angular/core';
import { DialogComponent } from '../../../../../shared/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-user-create-general-information-step',
  templateUrl: './generial-information-step.component.html',
  standalone: true,
  imports: [DialogComponent, ButtonModule],
})
export class GeneralInformationStep {}
