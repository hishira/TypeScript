import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getFullAddress } from 'src/app/models/address.models';
import { Optional } from 'src/app/models/core.models';
import { PetGQL, PetSchema } from 'src/app/types/types';
import { Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-pet-sponsor',
  styleUrls: ['./pet-sponsor.scss'],
  templateUrl: './pet-sponsor.component.html',
})
export class PetSponsorComponent implements OnInit {
  donationValues: number[] = [5, 20, 50, 100, 500];
  examplePhotoUrl: string = '';
  form: FormGroup;
  fullAddress: string = '';
  lastClickedButton: HTMLButtonElement | undefined = undefined;
  pet: PetSchema;
  shelterLink: string = '';
  constructor(
    private router: ActivatedRoute,
    private petQuery: PetGQL,
    private formBuilder: FormBuilder,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.form = this.formBuilder.group({
      amount: [0, Validators.required],
      confirmEmail: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      message: [''],
    });
    this.form.valueChanges.subscribe((vlaues) => {
      console.log(vlaues);
    });
    this.petQuery
      .watch({ petFilter: { id: { eq: parseInt(id) } } })
      .valueChanges.subscribe((result) => {
        this.pet = result.data.pets[0] as PetSchema;
        this.fullAddress = getFullAddress(this.pet.center.address);
        this.shelterLink = `/shelter/${this.pet.center.id}`;
        this.examplePhotoUrl = !!this.pet.photos.length
          ? this.pet.photos[0].url
          : '';
        console.log(this.examplePhotoUrl);
      });
  }

  selectDonationCost(donationCost: number, button: HTMLButtonElement): void {
    this.lastClickedButton &&
      this.documentService.togglElementClasses(
        this.lastClickedButton,
        'btn-primary',
        'btn-outline-primary'
      );
    this.form.patchValue({ amount: donationCost });
    this.documentService.togglElementClasses(
      button,
      'btn-primary',
      'btn-outline-primary'
    );
    this.lastClickedButton = button;
  }
}
