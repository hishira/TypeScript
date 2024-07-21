import { FormControl } from '@angular/forms';
export type GeneralInformationStepGroup = {
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  email: FormControl<string>;
  birthDate: FormControl<string>;
  gender: FormControl<Gender | null>;
};

export enum Gender {
  Men = 'Man',
  Woman = 'Woman',
}
