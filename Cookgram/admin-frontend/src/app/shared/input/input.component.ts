import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
  Self,
  input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { noop } from 'rxjs';
import { ErrorsComponent } from '../errors/errors.component';
import { EventHandler } from './input.utils';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  validate(_: AbstractControl<any, any>): ValidationErrors | null {
    return this.control.errors;
  }

  registerOnValidatorChange?(fn: () => void): void {}

  ngOnInit(): void {
    this.inheritValidatorFromControl();
    this.ngControl.control?.events?.subscribe((event) =>
      EventHandler(event, this.control)
    );
    this.control.valueChanges.subscribe((v) => this.onChange(v));
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

  private inheritValidatorFromControl(): void {
    this.ngControl?.control &&
      this.control.addValidators(this.ngControl?.control?.validator ?? []);
  }
}
