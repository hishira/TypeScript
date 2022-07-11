import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { PasswordForgetComponent } from '../password-forget/password-forget.component';
import { SignUpComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}
  
  forgetPassword() {
    this.modalService.changeBodycontent(PasswordForgetComponent, {});
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.modalService.changeBodycontent(SignUpComponent, {});
  }
}
