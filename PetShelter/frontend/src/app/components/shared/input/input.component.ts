import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const noneFunction = () => {};

@Component({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Input() type: string;

  private _value: string | number;
  private onChangeCallback: (_: any) => void = noneFunction;
  private onTouchedCallback: () => void = noneFunction;
  constructor() {}

  get value() {
    return this._value;
  }

  set value(newValue: string | number) {
    this._value = newValue;
    this.onChangeCallback(newValue);
    this.onTouchedCallback();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  writeValue(value: string | number): void {
    this.value = value;
  }
}
