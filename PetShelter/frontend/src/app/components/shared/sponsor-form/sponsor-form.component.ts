import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import {
  DEFAULT_DONATE_COST,
  SUPPORT_BUTTON_CLASSES,
} from 'src/app/utils/const';

type PetSponsorForm = {
  amount: FormControl<number>,
  cardNumber:  FormControl<string>
  confirmEmail: FormControl<string>,
  email: FormControl<string>,
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  message: FormControl<string | null>,
}
export type PetsponsorValue = Partial<{
  amount: number,
  cardNumber:  string,
  confirmEmail: string,
  email: string,
  firstName: string,
  lastName: string,
  message: string | null,
}>
@Component({
  selector: 'app-sponsor-form',
  templateUrl: './sponsor-form.component.html',
})
export class SponsorFormComponent implements OnInit {

  @Output() formEmitter: EventEmitter<PetsponsorValue> = new EventEmitter<PetsponsorValue>();
  donationValues: number[] = [5, 20, 50, 100, 500];
  form: FormGroup<PetSponsorForm>;
  lastClickedButton: HTMLButtonElement | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService
  ) {}

  donate() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if(this.form.valid){
      this.formEmitter.emit(this.form.value)
    }
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group<PetSponsorForm>({
      amount: new FormControl(DEFAULT_DONATE_COST, {nonNullable: true, validators: [Validators.required]}),
      cardNumber: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      confirmEmail: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      message : new FormControl('', {nonNullable: false}),
    });
  }

  selectDonationCost(donationCost: number, button: HTMLButtonElement): void {
    this.lastClickedButton &&
      this.documentService.togglElementClasses(
        this.lastClickedButton,
        ...SUPPORT_BUTTON_CLASSES
      );
    this.form.patchValue({ amount: donationCost });
    this.documentService.togglElementClasses(button, ...SUPPORT_BUTTON_CLASSES);
    this.lastClickedButton = button;
  }
}
