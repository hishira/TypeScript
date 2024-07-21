import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender, GeneralInformationStepGroup } from './create-user-model.types';

export const EmptyGeneralInformationGroup =
  (): FormGroup<GeneralInformationStepGroup> =>
    new FormGroup<GeneralInformationStepGroup>({
      firstName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      secondName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.email],
      }),
      birthDate: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      gender: new FormControl<Gender | null>(null),
    });
