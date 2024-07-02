import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ErrorsComponent } from '../../shared/errors/errors.component';
import { AuthenticationApiService } from '../../../api/authentication.api';
import { ToastService } from '../../shared/services/toast.service';
import { Store } from '@ngrx/store';
import { GetAccessTokenSelectors } from '../../../store/jwt/selectors';
import { MainStore } from '../../../store/main.store';

type LoginFormGroup = {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
};
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
    private readonly store: Store<MainStore>,
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
      .subscribe((r) => {
        if (r && 'error' in r) {
          this.toastService.showWarning('User not exists');
        } else {
          this.store.select(GetAccessTokenSelectors).subscribe((a)=>console.log(a));
        }
      });
  }
}
