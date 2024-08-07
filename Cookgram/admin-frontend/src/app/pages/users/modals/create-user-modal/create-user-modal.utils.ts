import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AccessConfigurationStepGroup,
  AddressStepGroup,
  CreateModalGroup,
  Gender,
  GeneralInformationStepGroup,
} from './create-user-model.types';

const DefaultNonNullabeOption: FormControlOptions & { nonNullable: true } = {
  nonNullable: true,
  validators: [Validators.required],
};

export const EmptyCreateUserFormGroup = (): FormGroup<CreateModalGroup> =>
  new FormGroup({
    generalInformation: EmptyGeneralInformationGroup(),
    accessConfiguration: EmptyAccessConfigurationGroup(),
    address: EmptyAddressStep(),
  });

export const EmptyGeneralInformationGroup =
  (): FormGroup<GeneralInformationStepGroup> =>
    new FormGroup<GeneralInformationStepGroup>({
      firstName: new FormControl<string>('', DefaultNonNullabeOption),
      secondName: new FormControl<string>('', DefaultNonNullabeOption),
      birthDate: new FormControl<string>('', DefaultNonNullabeOption),
      gender: new FormControl<Gender | null>(null),
    });

export const EmptyAccessConfigurationGroup =
  (): FormGroup<AccessConfigurationStepGroup> =>
    new FormGroup<AccessConfigurationStepGroup>({
      username: new FormControl<string>('', DefaultNonNullabeOption),
      email: new FormControl<string>('', DefaultNonNullabeOption),
      password: new FormControl<string>('', DefaultNonNullabeOption),
      confirmPassword: new FormControl<string>('', DefaultNonNullabeOption),
      temporaryPassword: new FormControl<boolean>(
        false,
        DefaultNonNullabeOption
      ),
    });

export const EmptyAddressStep = (): FormGroup<AddressStepGroup> =>
  new FormGroup<AddressStepGroup>({
    address: new FormControl<string>('', DefaultNonNullabeOption),
    house: new FormControl<string>('', DefaultNonNullabeOption),
    door: new FormControl<string>(''),
    city: new FormControl<string>('', DefaultNonNullabeOption),
    country: new FormControl<string>('', DefaultNonNullabeOption),
    postalCode: new FormControl<string>('', DefaultNonNullabeOption),
  });
