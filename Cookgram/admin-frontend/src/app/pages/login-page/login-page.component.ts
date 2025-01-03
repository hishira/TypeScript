import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { take } from 'rxjs';
import { AuthenticationApiService } from '../../../api/authentication.api';
import { LoginPayload, TokenResponse } from '../../../api/types/api.types';
import { GetAccessTokenSelectors } from '../../../store/jwt/selectors';
import { MainStore } from '../../../store/main.store';
import { InputComponent } from '../../shared/input/input.component';
import { ToastService } from '../../shared/services/toast.service';
import { Optional } from '../../shared/types/shared';
import { isNill } from '../../shared/utils';
import { LoginFormGroup } from './types';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CheckboxModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputComponent,
  ],
  providers: [AuthenticationApiService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  readonly loginFormGroup: FormGroup<LoginFormGroup> =
    new FormGroup<LoginFormGroup>({
      username: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: new FormControl<string>('', [Validators.required]),
    });

  get loginPayload(): LoginPayload {
    return {
      username: this.loginFormGroup.value.username ?? '',
      password: this.loginFormGroup.value.password ?? '',
    };
  }

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationApiService,
    private readonly toastService: ToastService,
    private readonly store: Store<MainStore>
  ) {}

  signIn(): void {
    if (!this.validateForm()) return;
    this.authenticationService
      .login(this.loginPayload)
      .subscribe((r) => this.handleLoginResponse(r));
  }

  private validateForm(): boolean {
    this.loginFormGroup.markAllAsTouched();
    this.loginFormGroup.updateValueAndValidity();
    if (!this.loginFormGroup.valid) {
      this.toastService.showError('Errors occurs in form');

      return false;
    }

    return true;
  }

  private handleLoginResponse(response: Optional<TokenResponse>): void {
    const userNotExists = this.chckIfUserExistsBasedOnResponse(response);
    if (userNotExists) {
      this.toastService.showWarning('User not exists');

      return;
    }
    this.store.select(GetAccessTokenSelectors).pipe(take(1)).subscribe();
    this.router.navigate(['/admin']);
  }

  private chckIfUserExistsBasedOnResponse(
    response: Optional<TokenResponse>
  ): boolean {
    return (
      isNill(response) ||
      (response && 'error' in response) ||
      (response.accessToken === '' && response.refreshToken === '')
    );
  }
}
