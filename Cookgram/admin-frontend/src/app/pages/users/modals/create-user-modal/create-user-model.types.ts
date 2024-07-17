import { FormControl } from '@angular/forms';
export type GeneralInformationStepGroup = {
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  email: FormControl<string>;
  birtbDate: FormControl<string>;
};
