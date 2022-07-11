import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-password-forget',
    styleUrls: ['./password-forget.scss'],
    templateUrl: './password-forget.component.html'
})
export class PasswordForgetComponent implements OnInit{
    form: FormGroup

    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['',Validators.email]
        })
    }

}