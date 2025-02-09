import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { AbstractControl, TouchedChangeEvent } from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { EMAIL_ERROR, REQUIRED_ERROR } from './consts';
import { ErrorsTypes } from './errors-types';
import { BaseComponent } from '../components/base-component/base-component';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
})
export class ErrorsComponent extends BaseComponent {
  readonly control = input.required<AbstractControl>();

  errorsChange$: Observable<string[]> = of([]);

  override initialize(): void {
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
        if (!(e instanceof TouchedChangeEvent)) return [];
        this.control().markAsDirty();
        return this.getCurrentListOfErrors();
      })
    );
  }

  private getCurrentListOfErrors(): string[] {
    const errorsList = [];
    const errors = this.control().errors;

    errors && ErrorsTypes.Required in errors && errorsList.push(REQUIRED_ERROR);
    errors && ErrorsTypes.Email in errors && errorsList.push(EMAIL_ERROR);

    return errorsList;
  }
}
