import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { AbstractControl, TouchedChangeEvent } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { ErrorsTypes } from './errors-types';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
})
export class ErrorsComponent implements OnInit {
  control = input.required<AbstractControl>();
  errorsChange$: Observable<string[]> = of([]);
  
  ngOnInit(): void {
    this.errorsChange$ = combineLatest([
      this.getEventObservable(),
      this.getStatusChangeObservable(),
    ]).pipe(
      map(([eventErrors, valueErrors]) => {
        return eventErrors.length > 0 ? eventErrors : valueErrors;
      })
    );
  }

  private getStatusChangeObservable(): Observable<string[]> {
    return this.control().statusChanges.pipe(
      startWith(this.control().status),
      map((_) => {
        if (!this.control().dirty) return [];

        return this.getCurrentListOfErrors();
      })
    );
  }
  private getEventObservable(): Observable<string[]> {
    return this.control().events.pipe(
      map((e) => {
        if (e instanceof TouchedChangeEvent) {
          this.control().markAsDirty();

          return this.getCurrentListOfErrors();
        }
        return [];
      })
    );
  }

  private getCurrentListOfErrors(): string[] {
    const errorsList = [];
    const errors = this.control().errors;

    errors &&
      ErrorsTypes.Required in errors &&
      errorsList.push('Field is required');
    errors &&
      ErrorsTypes.Email in errors &&
      errorsList.push('Email is invalid');
    return errorsList;
  }
}
