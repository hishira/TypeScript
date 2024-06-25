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
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationApiService
  ) {}
  signIn(): void {
    this.loginFormGroup.markAllAsTouched();
    this.loginFormGroup.markAsDirty();
    this.loginFormGroup.updateValueAndValidity();
    if (!this.loginFormGroup.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Errors occurs in form',
        key: 'br',
        life: 2000,
      });

      return;
    }
    this.authenticationService.login({
      username: this.loginFormGroup.value.username ?? '',
      password: this.loginFormGroup.value.password ?? '',
    }).subscribe((r)=>{console.log(r)});
  }
}
