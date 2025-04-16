import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RequiredDot } from '../../required-dot/required-dot.componen';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RequiredDot,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './date-input.component.html',
})
export class DateInputComponent {
  label = input.required<string>();
  required = input.required<boolean>();
  control = input.required<FormControl>();
}
