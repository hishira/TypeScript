import { FormControl } from '@angular/forms';

export type GeneralInformationStepGroup = {
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  email: FormControl<string>;
  birthDate: FormControl<string>;
  gender: FormControl<Gender | null>;
};

export type AccessConfigurationStepGroup = {
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  temporaryPassword: FormControl<boolean> // TODO: Check for backend implementation
};

export enum Gender {
  Men = 'Man',
  Woman = 'Woman',
}
