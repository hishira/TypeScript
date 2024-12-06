import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl } from '../../../../shared/types/shared';
import { Role } from '../../../../shared/types/enums';

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

export type GeneralInformationValue =
  ExtractFormControl<GeneralInformationStepGroup>;

export type AccessConfigurationStepGroup = {
  username: FormControl<string>;
  password: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<Role>;
  confirmPassword: FormControl<string>;
  temporaryPassword: FormControl<boolean>;
};

export type AccessConfigurationValue =
  ExtractFormControl<AccessConfigurationStepGroup>;

export type AddressControl = {
  address: string;
  house: string;
  door: string | null;
  city: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
};

export enum Gender {
  Men = 'Man',
  Woman = 'Woman',
}

export type ActiveUserModalIndex = 0 | 1 | 2 | 3;
