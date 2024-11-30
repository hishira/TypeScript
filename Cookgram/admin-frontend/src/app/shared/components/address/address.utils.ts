import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { DefaultNonNullabeOption } from '../../consts/form.consts';
import { AddressFields, AddressGroup, AddressRequiredMap } from './types';

export const EmptyAddressStep = (): FormGroup<AddressGroup> =>
  new FormGroup<AddressGroup>({
    address: new FormControl<string>('', DefaultNonNullabeOption),
    house: new FormControl<string>('', DefaultNonNullabeOption),
    door: new FormControl<string>(''),
    city: new FormControl<string>('', DefaultNonNullabeOption),
    country: new FormControl<string>('', DefaultNonNullabeOption),
    postalCode: new FormControl<string>('', DefaultNonNullabeOption),
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
  controlLike: any
): controlLike is AbstractControl =>
  'value' in controlLike && 'markAllAsTouched' in controlLike;
