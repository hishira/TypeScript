import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import {
  AbstractControl,
  ControlEvent,
  TouchedChangeEvent,
} from '@angular/forms';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';

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
      startWith(this.control().value),
      map((status) => {
        if (!this.control().dirty) return [];
        const errors = this.control().errors;
        return errors && 'required' in errors ? ['Field is required'] : [];
      })
    );
  }
  private getEventObservable(): Observable<string[]> {
    return this.control().events.pipe(
      map((e) => {
        if (e instanceof TouchedChangeEvent) {
          this.control().markAsDirty();
          const errors = this.control().errors;
          return errors && 'required' in errors ? ['Field is required'] : [];
        }
        return [];
      })
    );
  }
}
