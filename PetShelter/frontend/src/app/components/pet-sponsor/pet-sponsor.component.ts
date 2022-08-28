import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getFullAddress } from 'src/app/models/address.models';
import { Optional } from 'src/app/models/core.models';
import { PetGQL, PetSchema } from 'src/app/types/types';
import { Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import {
  DEFAULT_DONATE_COST,
  SUPPORT_BUTTON_CLASSES,
} from 'src/app/utils/const';

interface Sponsor {
  amount: number;
  cardNumber: string;
  confirmEmail: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}
type SponsorControls = { [key in keyof Sponsor]: AbstractControl };
type SponsorForm = UntypedFormGroup & { controls: SponsorControls; value: Sponsor };
@Component({
  selector: 'app-pet-sponsor',
  styleUrls: ['./pet-sponsor.scss'],
  templateUrl: './pet-sponsor.component.html',
})
export class PetSponsorComponent implements OnInit {
  examplePhotoUrl: string = '';
  fullAddress: string = '';
  pet: PetSchema;
  shelterLink: string = '';

  constructor(
    private router: ActivatedRoute,
    private petQuery: PetGQL,
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
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
}
