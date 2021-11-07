import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet.model';
@Component({
  selector: 'pet-cats',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets?: Pet[];
  constructor(
    private petsservice: PetService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      if(params["pettype"] === "cats")  {
        this.getCats()
      }else if(params["pettype"] === "dogs") {
        this.getDogs();
      }
    })
  }
  private getDogs():void {
    this.petsservice.getOnlyDogs().subscribe((dogs: Pet[])=>{
      this.pets = dogs;
    })
  }

  private getCats(): void {
    this.petsservice.getOnlyCats().subscribe((cats: Pet[]) => {
      this.pets = cats;
    });
  }
}
