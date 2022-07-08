import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

    form: FormGroup;
    constructor(private formBuilder: FormBuilder){}
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            login: ['',Validators.required],
            password: ['',Validators.required]
        })
    }
}