import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
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
import { EmptyAddressRequiredMap, EmptyAddressStep } from './address.utils';
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
  implements ControlValueAccessor, OnInit
{
  readonly addressRequiredMap = input<AddressRequiredMap>(
    EmptyAddressRequiredMap
  );

  readonly form: FormGroup = EmptyAddressStep();

  onChange: (v: unknown) => void = noop;

  ngOnInit(): void {
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

  registerOnTouched(fn: unknown): void {
    /* TODO document why this method 'registerOnTouched' is empty */
  }

  setDisabledState?(isDisabled: boolean): void {
    /* TODO document why this method 'setDisabledState' is empty */
  }
}
