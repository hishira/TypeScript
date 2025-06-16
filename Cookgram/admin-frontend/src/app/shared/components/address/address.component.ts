import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { noop } from 'rxjs';
import { InputComponent } from '../../input/input.component';
import { BaseComponent } from '../base-component/base-component';
import { EMPTY_ADDRESS_REQUIRED_MAP, createEmptyAddressStep } from './address.utils';
import { AddressRequiredMap } from './types';

@Component({
  selector: 'ca-address',
  templateUrl: './address.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressComponent,
    },
  ],
})
export class AddressComponent
  extends BaseComponent
  implements ControlValueAccessor
{
  readonly addressRequiredMap = input<AddressRequiredMap>(
    EMPTY_ADDRESS_REQUIRED_MAP
  );
  readonly form: FormGroup = createEmptyAddressStep();

  onChange: (v: unknown) => void = noop;

  override initialize(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe((a) => this.onChange(a))
    );
  }

  writeValue(obj: unknown): void {
    if (obj) this.form.setValue(obj);
  }

  registerOnChange(fn: (v: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {
    /* TODO document why this method 'registerOnTouched' is empty */
  }

  setDisabledState?(): void {
    /* TODO document why this method 'setDisabledState' is empty */
  }
}
