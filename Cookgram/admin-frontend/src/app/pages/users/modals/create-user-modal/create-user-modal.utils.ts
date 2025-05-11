import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  DefaultNonNullabeOption,
  NonNullable,
} from '../../../../shared/consts/form.consts';
import { Role } from '../../../../shared/types/enums';
import {
  AccessConfigurationStepGroup,
  AddressControl,
  CreateModalGroup,
  Gender,
  GenderName,
  GeneralInformationStepGroup,
} from './create-user-model.types';

export const EmptyCreateUserFormGroup = (): FormGroup<CreateModalGroup> =>
  new FormGroup({
    generalInformation: EmptyGeneralInformationGroup(),
    accessConfiguration: EmptyAccessConfigurationGroup(),
    address: EmptyAddressControl(),
  });

export const EmptyGeneralInformationGroup =
  (): FormGroup<GeneralInformationStepGroup> =>
    new FormGroup<GeneralInformationStepGroup>({
      firstName: new FormControl<string>('', DefaultNonNullabeOption),
      secondName: new FormControl<string>('', DefaultNonNullabeOption),
      birthDate: new FormControl<string>('', DefaultNonNullabeOption),
      gender: new FormControl<Gender>(Gender.Men, NonNullable),
    });

const accessGroupValidation: ValidatorFn = (
  accessGroup: AbstractControl
): ValidationErrors | null => {
  const password = accessGroup.get('password')?.value;
  const confirmPassword = accessGroup.get('confirmPassword')?.value;

  return password !== confirmPassword ? { passwordsNotMatch: true } : null;
};

export const EmptyAccessConfigurationGroup =
  (): FormGroup<AccessConfigurationStepGroup> =>
    new FormGroup<AccessConfigurationStepGroup>(
      {
        username: new FormControl<string>('', DefaultNonNullabeOption),
        email: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl<string>('', DefaultNonNullabeOption),
        confirmPassword: new FormControl<string>('', DefaultNonNullabeOption),
        temporaryPassword: new FormControl<boolean>(
          false,
          DefaultNonNullabeOption
        ),
        role: new FormControl<Role>(Role.User, DefaultNonNullabeOption),
      },
      { validators: [accessGroupValidation] }
    );

export const EmptyAddressControl = (): FormControl<AddressControl> =>
  new FormControl<AddressControl>(
    null as unknown as AddressControl,
    DefaultNonNullabeOption
  );

export const PossibleGenders = (): GenderName[] =>
  Object.values(Gender) as unknown as GenderName[];
