import { FormControlOptions, Validators } from '@angular/forms';

export const DefaultNonNullabeOption: FormControlOptions & {
  nonNullable: true;
} = {
  nonNullable: true,
  validators: [Validators.required],
};
