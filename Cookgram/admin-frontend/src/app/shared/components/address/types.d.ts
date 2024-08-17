import { FormControl } from '@angular/forms';
import { ExtractFormControl } from '../../types/shared';

export type AddressGroup = {
    address: FormControl<string>;
    house: FormControl<string>;
    door: FormControl<string | null>;
    city: FormControl<string>;
    country: FormControl<string>;
    postalCode: FormControl<string>;
  };

export type AddressValue = ExtractFormControl<AddressGroup>