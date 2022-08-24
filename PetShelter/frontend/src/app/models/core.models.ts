import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export type Unknown = null | undefined;
export interface Optional<T> {   
    value: T | Unknown;
}
