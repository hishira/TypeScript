import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pet } from '../../../models/pet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { getFullAddress } from 'src/app/models/address.models';
import { ModalService } from 'src/app/services/modal.service';
import { LoginComponent } from '../../login/login.component';
import { PetGQL, PetSchema } from 'src/app/types/types';
import { get } from 'lodash';
@Component({
  selector: 'app-pet',
  styleUrls: ['./pet.component.scss'],
  templateUrl: './pet.component.html',
})
export class PetComponent implements OnInit {
  @Output() backEmit: EventEmitter<string> = new EventEmitter<string>();
  @Input() petId: number;

  fullAddress: string;
  pet: PetSchema;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private petQuery: PetGQL,
  ) {}

  backPage() {
    const pettype = this.activateRoute.snapshot.params['pettype'];
    console.log(pettype);
    this.backEmit.emit();
    this.router.navigate([`/pets/${pettype}`]);
  }

  loginHandle(): void {
    this.modalService.open(LoginComponent, {});
  }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.petId = parseInt(id);
    this.petQuery.watch({
      petId: this.petId
    }).valueChanges.subscribe((pet)=>{
      if(pet.data) {
        this.pet = get(pet, 'data.pets[0]', {});
        this.fullAddress = getFullAddress(this.pet.center.address);
      }
    })
  }

  petSponsor() {
    this.router.navigate([`sponsor/${this.petId}`],);
  }
}
