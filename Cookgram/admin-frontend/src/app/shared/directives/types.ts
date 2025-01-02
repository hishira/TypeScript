import { AbstractControl, FormGroup } from '@angular/forms';

export type CheckType<T> = T extends { [key: string]: AbstractControl }
  ? FormGroup<T>
  : T;

export type Controlable =
  | { [key: string]: AbstractControl }
  | AbstractControl
  | null
  
