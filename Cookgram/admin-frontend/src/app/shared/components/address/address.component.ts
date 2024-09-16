import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { noop } from 'rxjs';
import { EmptyAddressStep } from './address.utils';
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
  form: FormGroup = EmptyAddressStep();

  onChange: (v: any) => void = noop;

  ngOnInit(): void {
    this.form.valueChanges.subscribe((a) => this.onChange(a));
  }

  writeValue(obj: any): void {
    if (obj) this.form.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
