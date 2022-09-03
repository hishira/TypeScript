import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
const noneFunction = () => {};

@Component({
  providers: [
    //{
    //  multi: true,
    //  provide: NG_VALUE_ACCESSOR,
    //  useExisting: forwardRef(() => InputComponent),
    //},
    //{
    //  multi: true,
    //  provide: NG_VALIDATORS,
    //  useExisting: InputComponent,
    //},
  ],
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Input() required: boolean = false;
  @Input() type: string;
  @Input() validStyleVisible: boolean = true;

  control: AbstractControl | null;
  validators: ValidationErrors | null = {};

  private _value: string | number;
  private onChangeCallback: (_: any) => void = noneFunction;
  private onTouchedCallback: () => void = noneFunction;
  constructor(
    private validationService: ValidatorsService,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get value() {
    return this._value;
  }

  get valid(): boolean {
    return this.validStyleVisible && (!!this.control && this.control.valid)
  }

  set value(newValue: string | number) {
    this._value = newValue;
    this.onChangeCallback(newValue);
    this.onTouchedCallback();
  }

  isValid(control: AbstractControl): boolean {
    const validators = this.validate(control);
    return !!(
      validators &&
      Object.keys(validators).filter((key) => validators[key]).length === 0
    );
  }

  ngOnInit(): void {
    this.control = this.ngControl.control;
    console.log(this.ngControl)
    //this.ngControl.control?.addValidators([this.validate.bind(this)]);
    //this.ngControl.control?.updateValueAndValidity();
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let validationErrors: ValidationErrors | null = {};
    if (this.required) {
      validationErrors = this.validationService.required(control);
      const oldErrors = this.control?.errors;
      console.log(oldErrors)
      this.control?.setErrors({...oldErrors, ...validationErrors})
    }
    this.validators = validationErrors;
    return validationErrors;
  }

  writeValue(value: string | number): void {
    this.value = value;
  }
}
