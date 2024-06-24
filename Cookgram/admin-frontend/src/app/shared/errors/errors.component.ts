import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';

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
    this.errorsChange$ = this.control().statusChanges.pipe(
      startWith(this.control().value),
      map((status) => {
        if (!this.control().dirty) return [];
        const errors = this.control().errors;
        return errors && 'required' in errors ? ['Field is required'] : [];
      })
    );
  }
}
