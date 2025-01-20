import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DefaultNonNullabeOption } from '../../consts/form.consts';
import { AddressFields, AddressGroup, AddressRequiredMap } from './types';

const EmptyString = '';
export const EmptyAddressStep = (): FormGroup<AddressGroup> =>
  new FormGroup<AddressGroup>({
    address: new FormControl<string>(EmptyString, DefaultNonNullabeOption),
    house: new FormControl<string>(EmptyString, DefaultNonNullabeOption),
    door: new FormControl<string>(EmptyString),
    city: new FormControl<string>(EmptyString, DefaultNonNullabeOption),
    country: new FormControl<string>(EmptyString, DefaultNonNullabeOption),
    postalCode: new FormControl<string>(EmptyString, DefaultNonNullabeOption),
  });

export const EmptyAddressRequiredMap: AddressRequiredMap = {
  [AddressFields.Address]: false,
  [AddressFields.House]: false,
  [AddressFields.Door]: false,
  [AddressFields.PostalCode]: false,
  [AddressFields.City]: false,
  [AddressFields.Country]: false,
};

export const isLikeAbstractControl = (
  controlLike: unknown
): controlLike is AbstractControl =>
  controlLike instanceof Object &&
  'value' in controlLike &&
  'markAllAsTouched' in controlLike;
