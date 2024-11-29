import { AbstractControl, FormGroup } from '@angular/forms';
import { Nullable } from '../types/shared';

export type CheckType<T> = T extends { [key: string]: AbstractControl }
  ? FormGroup<T>
  : T;

export type Controlable =
  | { [key: string]: AbstractControl }
  | AbstractControl
  | Nullable<any>;
