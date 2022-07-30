import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { PetFilterEvent } from 'src/app/models/pet-filter-event.model';
import { PetFilterService } from '../../../services/pet-filter.service';
import { PetType } from 'src/app/models/PetType.model';
import { PetQuery, PetSchema } from 'src/app/types/types';
import { ApolloQueryResult } from '@apollo/client/core';
@Component({
  selector: 'pet-cats',
  styleUrls: ['./pets.component.scss'],
  templateUrl: './pets.component.html',
})
export class PetsComponent implements OnInit {
  
  // TODO Refactor
  public filteredPets?: Partial<PetSchema>& {[key: string]: any}[];
  pets?: Partial<PetSchema> & {[key: string]: any}[];
  pettype?: PetType;
  constructor(
    private petsservice: PetService,
    private router: ActivatedRoute,
    private filterService: PetFilterService
  ) {}

  getFilterInfo(filterMap: Map<string, (pet: Partial<PetSchema>) => boolean>): void {
    this.filteredPets = this.pets
      ? this.filterService.tableFilter(this.pets, filterMap)
      : this.filteredPets;
    console.log(this.filteredPets);
  }
  
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      if (params['pettype'] === 'cats') {
        this.getCats();
      } else if (params['pettype'] === 'dogs') {
        this.getDogs();
      }
    });
  }
  
  private getCats(): void {
    this.petsservice.getCats().subscribe((result:ApolloQueryResult<PetQuery>)=>{
      this.pets = this.filteredPets = result.data.pets;
      this.pettype = 'Cat';
    })
  }
  
  private getDogs(): void {
 
    this.petsservice.getDogs().subscribe((result: ApolloQueryResult<PetQuery>)=>{
      this.pets = this.filteredPets = result.data.pets
      this.pettype = 'Dog'
    })
  }

 
}
