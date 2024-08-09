import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  ControlValueAccessor,
} from '@angular/forms';
import { EmptyAddressStep } from '../../../pages/users/modals/create-user-modal/create-user-modal.utils';
import { ErrorsComponent } from '../../errors/errors.component';
import { InputComponent } from '../../input/input.component';
import { noop } from 'rxjs';
@Component({
  selector: 'ca-address',
  templateUrl: './address.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
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
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
