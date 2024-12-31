import { FormControl } from '@angular/forms';
import { Optional } from '../../shared/types/shared';

export type LoginFormGroup = {
  username: FormControl<Optional<string>>;
  password: FormControl<Optional<string>>;
};
