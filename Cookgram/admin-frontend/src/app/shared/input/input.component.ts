import { Component, OnInit, Optional, Self, input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { noop } from 'rxjs';
import { NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorsComponent } from '../errors/errors.component';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputTextModule, ErrorsComponent],
})
export class InputComponent implements ControlValueAccessor, OnInit, Validator {
  label = input<string>('');
  withErrors = input<boolean>(false);
  control = new FormControl<string | null>('');

  onChange: (value: string | null) => void = noop;
  onTouch: () => void = noop;
  constructor(@Optional() @Self() private ngControl: NgControl) {
    this.ngControl && (this.ngControl.valueAccessor = this);
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.control.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((v) => this.onChange(v));
    this.control.validator &&
      this.control.addValidators(this.control.validator);
  }
  writeValue(obj: any): void {
    this.control.setValue(obj);
    this.control.updateValueAndValidity();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}
