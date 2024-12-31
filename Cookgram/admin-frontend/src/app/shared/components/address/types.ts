import { FormControl } from '@angular/forms';
import { ExtractFormControl, Optional } from '../../types/shared';

export type AddressGroup = {
  address: FormControl<string>;
  house: FormControl<string>;
  door: FormControl<Optional<string>>;
  city: FormControl<string>;
  country: FormControl<string>;
  postalCode: FormControl<string>;
};

export enum AddressFields {
  Address = 'Address',
  House = 'House',
  Door = 'Door',
  PostalCode = 'PostalCode',
  City = 'City',
  Country = 'Country',
}

export type AddressValue = ExtractFormControl<AddressGroup>;

export type AddressRequiredMap = { [key in AddressFields]: boolean };
