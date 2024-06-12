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
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  readonly loginFormGroup: FormGroup<LoginFormGroup> =
    new FormGroup<LoginFormGroup>({
      username: new FormControl<string | null>('', [Validators.required]),
      password: new FormControl<string | null>('', [Validators.required]),
    });

  constructor(private readonly messageService: MessageService) {}
  signIn(): void {
    if (!this.loginFormGroup.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Errors occurs in form',
        key: 'br',
        life: 2000,
      });
    }
  }
}
