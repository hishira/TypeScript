import { AbstractControl, FormGroup } from '@angular/forms';
import { Nullable } from '../../../api/types/user.types';

export type CheckType<T> = T extends { [key: string]: AbstractControl }
  ? FormGroup<T>
  : T;

export type Controlable =
  | { [key: string]: AbstractControl }
  | AbstractControl
  | Nullable<any>;
