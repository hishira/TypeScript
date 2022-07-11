import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pet } from "src/app/models/pet.model";
import { PetService } from "src/app/services/pet.service";
import { getFullAddress } from "src/app/models/address.models";
@Component({
    selector: 'app-pet-sponsor',
    styleUrls: ['./pet-sponsor.scss'],
    templateUrl: './pet-sponsor.component.html'
})
export class PetSponsorComponent implements OnInit{
    fullAddress: string = '';
    pet: Pet;
    shelterLink: string = ''
    constructor(
        private router: ActivatedRoute,
        private petService: PetService
    ){}

    ngOnInit(): void {
        const id = this.router.snapshot.params['id']
        this.petService.getPetById(id).subscribe((pet)=>{
           this.pet = pet as Pet;
           console.log(pet)
           this.fullAddress = getFullAddress(pet.center.address)
            this.shelterLink = `/shelter/${this.pet.center.id}`
        })
    }
}