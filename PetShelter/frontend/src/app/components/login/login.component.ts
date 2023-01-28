import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { PasswordForgetComponent } from '../password-forget/password-forget.component';
import { SignUpComponent } from '../signup/signup.component';
type LoginFormType = {
  login: FormControl<string>,
  password: FormControl<string>
}
@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup<LoginFormType>;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}
  
  forgetPassword() {
    this.modalService.changeBodycontent(PasswordForgetComponent, {});
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group<LoginFormType>({
      login: new  FormControl('',{nonNullable: true, validators: [Validators.required]}),
      password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });
  }

  signUp() {
    this.modalService.changeBodycontent(SignUpComponent, {});
  }
}
