import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl } from '../../../../shared/types/shared';

export type CreateModalGroup = {
  generalInformation: FormGroup<GeneralInformationStepGroup>;
  accessConfiguration: FormGroup<AccessConfigurationStepGroup>;
  address: FormControl<AddressControl>;
};

export type GeneralInformationStepGroup = {
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  birthDate: FormControl<string>;
  gender: FormControl<Gender | null>;
};

export type GeneralInformationValue = ExtractFormControl<GeneralInformationStepGroup>


export type AccessConfigurationStepGroup = {
  username: FormControl<string>;
  password: FormControl<string>;
  email: FormControl<string>;
  confirmPassword: FormControl<string>;
  temporaryPassword: FormControl<boolean>; // TODO: Check for backend implementation
};

export type AddressGroup = {
  address: FormControl<string>;
  house: FormControl<string>;
  door: FormControl<string | null>;
  city: FormControl<string>;
  country: FormControl<string>;
  postalCode: FormControl<string>;
};

export type AddressControl = {
  address: string;
  house: string;
  door: string | null;
  city: string;
  country: string;
  postalCode: string;
};
export enum Gender {
  Men = 'Man',
  Woman = 'Woman',
}
