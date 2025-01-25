import { EnvironmentProviders, Provider } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Role, State } from './enums';

export type ExtractFormControl<T> = {
  [K in keyof T]: T[K] extends FormControl<infer U>
    ? U
    : T[K] extends FormControl<infer U> 
    ? U 
    : T[K] extends FormArray<FormControl<infer U>>
    ? Array<U>
    : T[K] extends FormArray<FormControl<infer U>> 
    ? Array<U> 
    : T[K] extends FormArray<FormGroup<infer U>>
    ? Array<ExtractFormControl<U>>
    : T[K] extends FormArray<FormGroup<infer U>> 
    ? Array<ExtractFormControl<U>> 
    : T[K] extends FormGroup<infer U>
    ? ExtractFormControl<U>
    : T[K] extends FormGroup<infer U>
    ? ExtractFormControl<U> 
    : T[K] | undefined;
};

export type Credentials = {
  username: string;
  passwordIsTemporary: boolean;
};

export type Meta = {
  id: string;
  createDate: string;
  editDate: string;
};

type UserContact = {
  email: string;
  phone: string;
  fax: string;
};

export type PersonalInformation = {
  brithday: string;
  contacts: UserContact;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
};

export type EntityState = {
  current: State;
  previous: State;
};

export type ContextUser = {
  address: Address;
  credentials: Credentials;
  id: string;
  meta: Meta;
  personalInformation: PersonalInformation;
  roles: Role;
  state: State;
};

export type Nullable<T> = T | null;

export type Optional<T> = Nullable<T> | undefined;

export type Location = {
  latitude: Optional<number>;
  longitude: Optional<number>;
};

export type Address = {
  address: string;
  house: string;
  door: Optional<string>;
  city: string;
  country: string;
  location: Location;
  postalCode: string;
};

export type StorageItem<T> = {
  itemName: string;
  item: T;
};

export type RoleMap = {
  [key in readonly Role]: Role[];
};

export type Providers = Provider | EnvironmentProviders;
