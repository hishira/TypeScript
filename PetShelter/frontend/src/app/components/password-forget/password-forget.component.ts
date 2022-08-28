import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
type EmailFormType = {
    email: FormControl<string>
}
@Component({
    selector: 'app-password-forget',
    styleUrls: ['./password-forget.scss'],
    templateUrl: './password-forget.component.html'
})
export class PasswordForgetComponent implements OnInit{
    form: FormGroup<EmailFormType>

    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
        this.form = this.formBuilder.group<EmailFormType>({
            email: new FormControl('', {nonNullable: true, validators: [Validators.email]})
        })
    }

}