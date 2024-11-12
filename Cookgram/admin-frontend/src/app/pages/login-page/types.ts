import { FormControl } from '@angular/forms';

export type LoginFormGroup = {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
};
