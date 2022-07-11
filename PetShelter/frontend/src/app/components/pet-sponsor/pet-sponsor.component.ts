import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PetService } from "src/app/services/pet.service";

@Component({
    selector: 'app-pet-sponsor',
    styleUrls: ['./pet-sponsor.scss'],
    templateUrl: './pet-sponsor.component.html'
})
export class PetSponsorComponent implements OnInit{
    
    constructor(
        private router: ActivatedRoute,
        private petService: PetService
    ){}

    ngOnInit(): void {
        const id = this.router.snapshot.params['id']
        this.petService.getPetById(id).subscribe((pet)=>{
            console.log(pet);
        })
    }
}