import { DefaultNonNullabeOption } from "../../consts/form.consts";
import { AddressGroup } from "./types";
import { FormGroup, FormControl } from '@angular/forms';

export const EmptyAddressStep = (): FormGroup<AddressGroup> =>
  new FormGroup<AddressGroup>({
    address: new FormControl<string>('', DefaultNonNullabeOption),
    house: new FormControl<string>('', DefaultNonNullabeOption),
    door: new FormControl<string>(''),
    city: new FormControl<string>('', DefaultNonNullabeOption),
    country: new FormControl<string>('', DefaultNonNullabeOption),
    postalCode: new FormControl<string>('', DefaultNonNullabeOption),
  });
