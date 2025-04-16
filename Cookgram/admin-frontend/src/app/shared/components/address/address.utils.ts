import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DefaultNonNullabeOption } from '../../consts/form.consts';
import { AddressFields, AddressGroup, AddressRequiredMap } from './types';

const EMPTY_STRING = '';

export const createEmptyAddressStep = (): FormGroup<AddressGroup> => 
  new FormGroup<AddressGroup>({
    address: new FormControl<string>(EMPTY_STRING, DefaultNonNullabeOption),
    house: new FormControl<string>(EMPTY_STRING, DefaultNonNullabeOption),
    door: new FormControl<string>(EMPTY_STRING),
    city: new FormControl<string>(EMPTY_STRING, DefaultNonNullabeOption),
    country: new FormControl<string>(EMPTY_STRING, DefaultNonNullabeOption),
    postalCode: new FormControl<string>(EMPTY_STRING, DefaultNonNullabeOption),
  });

export const EMPTY_ADDRESS_REQUIRED_MAP: AddressRequiredMap = {
  [AddressFields.Address]: false,
  [AddressFields.House]: false,
  [AddressFields.Door]: false,
  [AddressFields.PostalCode]: false,
  [AddressFields.City]: false,
  [AddressFields.Country]: false,
};

export const isAbstractControlLike = (
  controlLike: unknown
): controlLike is AbstractControl =>
  typeof controlLike === 'object' &&
  controlLike !== null &&
  'value' in controlLike &&
  'markAllAsTouched' in controlLike;
