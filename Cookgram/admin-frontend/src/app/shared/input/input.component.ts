import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Optional,
  Self,
  input
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { noop } from 'rxjs';
import { BaseComponent } from '../components/base-component/base-component';
import { ErrorsComponent } from '../errors/errors.component';
import { RequiredDot } from '../required-dot/required-dot.componen';
import { Nullable } from '../types/shared';
import { EventHandler } from './input.utils';
import { InputStringTypes, InputTypes } from './types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    InputTextModule,
    ErrorsComponent,
    CommonModule,
    RequiredDot,
  ],
})
export class InputComponent
  extends BaseComponent
  implements ControlValueAccessor, Validator
{
  readonly type = input<InputTypes | InputStringTypes>(InputTypes.Text);
  readonly required = input<boolean>(false);
  readonly labelClasses = input<string>('');
  readonly label = input<string>('');
  readonly withErrors = input<boolean>(false);
  readonly control = new FormControl<Nullable<string>>('');

  onChange: (value: Nullable<string>) => void = noop;
  onTouch: () => void = noop;

  constructor(@Optional() @Self() private readonly ngControl: NgControl) {
    super();
    this.ngControl && (this.ngControl.valueAccessor = this);
  }

  validate(_: AbstractControl<unknown, unknown>): Nullable<ValidationErrors> {
    return this.control.errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    /* TODO document why this method 'registerOnValidatorChange' is empty */
  }

  override initialize(): void {
    this.inheritValidatorFromControl();
    this.subscription.add(
      this.ngControl.control?.events?.subscribe((event) =>
        EventHandler(event, this.control)
      )
    );
    this.subscription.add(
      this.control.valueChanges.subscribe((v) => this.onChange(v))
    );
  }

  writeValue(obj: Nullable<string>): void {
    this.control.setValue(obj);
    this.control.updateValueAndValidity();
  }

  registerOnChange(fn: (value: Nullable<string>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  private inheritValidatorFromControl(): void {
    this.ngControl?.control &&
      this.control.addValidators(this.ngControl?.control?.validator ?? []);
    if (this.required()) {
      this.control.addValidators([Validators.required]);
    }
  }
}
