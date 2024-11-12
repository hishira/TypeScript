import { NgIf } from '@angular/common';
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
import { AuthenticationApiService } from '../../../api/authentication.api';
import { TokenResponse } from '../../../api/types/api.types';
import { GetAccessTokenSelectors } from '../../../store/jwt/selectors';
import { MainStore } from '../../../store/main.store';
import { ErrorsComponent } from '../../shared/errors/errors.component';
import { InputComponent } from '../../shared/input/input.component';
import { ToastService } from '../../shared/services/toast.service';
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
    NgIf,
    ErrorsComponent,
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

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationApiService,
    private readonly toastService: ToastService,
    private readonly store: Store<MainStore>
  ) {}

  signIn(): void {
    this.loginFormGroup.markAllAsTouched();
    this.loginFormGroup.updateValueAndValidity();
    if (!this.loginFormGroup.valid) {
      this.toastService.showError('Errors occurs in form');

      return;
    }
    this.authenticationService
      .login({
        username: this.loginFormGroup.value.username ?? '',
        password: this.loginFormGroup.value.password ?? '',
      })
      .subscribe((r) => this.handleLoginResponse(r));
  }

  private handleLoginResponse(response: TokenResponse | null): void {
    const userExists = this.chckIfUserExistsBasedOnResponse(response);
    if (userExists) {
      this.toastService.showWarning('User not exists');
    } else {
      this.store
        .select(GetAccessTokenSelectors)
        .subscribe((a) => console.log(a));
      this.router.navigate(['/admin']);
    }
  }

  private chckIfUserExistsBasedOnResponse(
    response: TokenResponse | null
  ): boolean {
    return (
      response === null ||
      (response && 'error' in response) ||
      (response.accessToken === '' && response.refreshToken === '')
    );
  }
}
