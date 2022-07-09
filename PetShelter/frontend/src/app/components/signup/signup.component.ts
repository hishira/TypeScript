import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalService } from "src/app/services/modal.service";
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'app-signup',
    styleUrls: ['./signup.component.scss'],
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit{
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modalService: ModalService,
    ){}

    login(): void{
        this.modalService.changeBodycontent(LoginComponent, {});
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            confirmPassword: [''],
            country: ['',Validators.required],
            countryCode: ['',Validators.required],
            email: ['',Validators.required],
            lastName: ['',Validators.required],
            name: ['',Validators.required],
            password: ['',Validators.required],
        })
    }
}