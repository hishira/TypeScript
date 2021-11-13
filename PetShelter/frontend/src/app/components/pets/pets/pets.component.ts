import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../models/pet.model';
import { PetFilterEvent } from 'src/app/models/pet-filter-event.model';
import { PetFilterService } from '../../../services/pet-filter.service';
@Component({
  selector: 'pet-cats',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets?: Pet[];
  public filteredPets?: Pet[]
  constructor(
    private petsservice: PetService,
    private router: ActivatedRoute,
    private filterService: PetFilterService,
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
  private getDogs(): void {
    this.petsservice.getOnlyDogs().subscribe((dogs: Pet[])=>{
      this.pets = this.filteredPets = dogs;
    })
  }

  private getCats(): void {
    this.petsservice.getOnlyCats().subscribe((cats: Pet[]) => {
      this.pets = this.filteredPets = cats;
    });
  }

  public getFilterInfo(filterEvent: PetFilterEvent): void {
    this.filteredPets = this.pets ? 
      this.filterService.tableFilter(this.pets,filterEvent) :
      this.filteredPets;
  }
}
