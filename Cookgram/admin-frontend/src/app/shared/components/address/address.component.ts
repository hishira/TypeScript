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
      useExisting: AddressCompoent,
    },
  ],
})
export class AddressCompoent implements ControlValueAccessor, OnInit {
  addressRequiredMap = input<AddressRequiredMap>(EmptyAddressRequiredMap);
  form: FormGroup = EmptyAddressStep();

  onChange: (v: any) => void = noop;

  ngOnInit(): void {
    this.form.valueChanges.subscribe((a) => this.onChange(a));
  }

  writeValue(obj: any): void {
    if (obj) this.form.setValue(obj);
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
