import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ErrorResponse,
  TokenResponse,
  Tokens,
} from '../../../api/types/api.types';
import { Optional } from '../../shared/types/shared';
import { hasProperty, isEmptyString, isNill } from '../../shared/utils';
import { LoginFormGroup } from './types';

const responseHasEmptyTokens = (response: Tokens): boolean =>
  isEmptyString(response.accessToken) && isEmptyString(response.refreshToken);

export const chckIfUserExistsBasedOnResponse = (
  response: Optional<TokenResponse>
): boolean => {
  return (
    isNill(response) ||
    hasProperty<ErrorResponse>('error', response as any) ||
    (hasProperty<Tokens>('accessToken', response) &&
      responseHasEmptyTokens(response))
  );
};

export const EmptyLoginForm = (): FormGroup<LoginFormGroup> =>
  new FormGroup<LoginFormGroup>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', [Validators.required]),
  });
