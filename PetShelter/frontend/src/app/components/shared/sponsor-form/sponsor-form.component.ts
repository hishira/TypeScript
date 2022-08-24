import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import {
  DEFAULT_DONATE_COST,
  SUPPORT_BUTTON_CLASSES,
} from 'src/app/utils/const';

@Component({
  selector: 'app-sponsor-form',
  templateUrl: './sponsor-form.component.html',
})
export class SponsorFormComponent implements OnInit {
  donationValues: number[] = [5, 20, 50, 100, 500];
  form: FormGroup;
  lastClickedButton: HTMLButtonElement | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService
  ) {}

  donate() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [DEFAULT_DONATE_COST, Validators.required],
      cardNumber: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      message: [''],
    });
    this.form.valueChanges.subscribe(val=>console.log(val))
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
