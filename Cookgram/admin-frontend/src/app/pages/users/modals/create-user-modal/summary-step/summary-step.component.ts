import { Nullable } from 'primeng/ts-helpers';
import { AbstractStepDirective } from '../../../../../shared/directives/abstract-step.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../../../../../shared/dialog/dialog.component";
import { ReadoOnlyComponent } from "../../../../../shared/components/readonly-only/readonly-only.component";

@Component({
  selector: 'app-create-user-summary',
  templateUrl: './summary-step.component.html',
  standalone: true,
  imports: [CommonModule, DialogComponent, ReadoOnlyComponent],
})
export class SummaryStepComponent extends AbstractStepDirective<Nullable> {}
