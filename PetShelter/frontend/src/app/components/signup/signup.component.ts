import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ModalService } from "src/app/services/modal.service";
import { LoginComponent } from "../login/login.component";
type SignUpFormType = {
    confirmPassword: FormControl<string>,
    country: FormControl<string>,
    countryCode: FormControl<string>,
    email: FormControl<string>,
    lastName: FormControl<string>,
    name: FormControl<string>,
    password: FormControl<string>,
}
@Component({
    selector: 'app-signup',
    styleUrls: ['./signup.component.scss'],
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit{
    form: FormGroup<SignUpFormType>;

    constructor(
        private formBuilder: FormBuilder,
        private modalService: ModalService,
    ){}

    login(): void{
        this.modalService.changeBodycontent(LoginComponent, {});
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group<SignUpFormType>({
            confirmPassword: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
            country: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
            countryCode: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
            email: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
            lastName: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
            name: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
            password: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
        })
    }
}