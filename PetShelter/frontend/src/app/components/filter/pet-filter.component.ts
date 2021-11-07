import { Component, OnInit } from "@angular/core";
import {PetFilterService} from "../../services/pet-filter.service"
import {forkJoin} from "rxjs";
import { Gender } from "src/app/models/gender.model";
import { PetSize } from "src/app/models/PetSize.model";
import { Breed } from "src/app/models/breed.model";
@Component({
    selector: 'pet-filter',
    templateUrl: './pet-filter.component.html',
    styleUrls: ['./pet-filter.component.css'],
})
export class PetFilter implements OnInit {
    
    genders: Array<Gender> = []
    petsize: Array<PetSize> = []
    petBreeds: Array<Breed> = []
    constructor(
        private petFilterService: PetFilterService
    ){
        
    }
    ngOnInit(): void {
        forkJoin([
            this.petFilterService.getGenderPet(),
            this.petFilterService.getPetSize(),
            this.petFilterService.getDogBreeds(),
        ]).subscribe((res)=>{
            if (res.length === 3) {
                this.genders = res[0];
                this.petsize = res[1];
                this.petBreeds = res[2];
            }
        })
    }
}