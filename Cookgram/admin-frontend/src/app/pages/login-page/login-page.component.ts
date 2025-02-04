import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { BaseComponent } from '../../shared/components/base-component/base-component';
import { InputComponent } from '../../shared/input/input.component';
import { ToastService } from '../../shared/services/toast.service';
import { Optional } from '../../shared/types/shared';
import { LoginFormGroup } from './types';
import { EmptyLoginForm, chckIfUserExistsBasedOnResponse } from './utils';

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
export class LoginPageComponent extends BaseComponent {
  readonly loginFormGroup: FormGroup<LoginFormGroup> = EmptyLoginForm();

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
  ) {
    super();
  }

  signIn(): void {
    if (!this.validateForm()) return;
    this.subscription.add(
      this.authenticationService
        .login(this.loginPayload)
        .subscribe((r) => this.handleLoginResponse(r))
    );
  }

  private validateForm(): boolean {
    this.loginFormGroup.markAllAsTouched();
    this.loginFormGroup.updateValueAndValidity();
    if (this.loginFormGroup.valid) return true;
    this.toastService.showError('Errors occurs in form');

    return false;
  }

  private handleLoginResponse(response: Optional<TokenResponse>): void {
    const userNotExists = chckIfUserExistsBasedOnResponse(response);
    if (userNotExists) {
      this.toastService.showWarning('User not exists');

      return;
    }
    this.subscription.add(
      this.store.select(GetAccessTokenSelectors).pipe(take(1)).subscribe()
    );
    this.router.navigate(['/admin']);
  }
}
