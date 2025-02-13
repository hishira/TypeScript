import { FormControlOptions, Validators } from '@angular/forms';

export const NonNullable: {
  nonNullable: true;
} = { nonNullable: true };

export const DefaultNonNullabeOption: FormControlOptions & {
  nonNullable: true;
} = {
  nonNullable: true,
  validators: [Validators.required],
};
