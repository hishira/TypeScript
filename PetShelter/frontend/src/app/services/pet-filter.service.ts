import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender.model';
import { PetSize } from '../models/petsize.model';
import { Breed } from '../models/breed.model';
import { Pet } from '../models/pet.model';
import { PetFilterType } from '../models/FilterType.model';
import { PetFilterEvent } from '../models/pet-filter-event.model';
import { PetType } from '../models/PetType.model';

@Injectable({
  providedIn: 'root',
})
export class PetFilterService extends ApiService {
  private readonly petGenders: string = this.getUrl('gender');
  private readonly petSize: string = this.getUrl('petsize');
  private readonly dogBreeds: string = this.getUrl('breed/dog');
  private readonly catBreeds: string = this.getUrl('breed/cat');

  constructor(http: HttpClient) {
    super(http);
  }

  public getGenderPet(): Observable<Gender[]> {
    return this.getArrayOf<Gender>(this.petGenders);
  }

  public getPetSize(): Observable<PetSize[]> {
    return this.getArrayOf<PetSize>(this.petSize);
  }

  public getBreeds(pettype: PetType): Observable<Breed[]> {
    switch(pettype){
      case 'Dog' :
        return this.getDogBreeds();
      case 'Cat' :
        return this.getCatsBreeds();
      default :
        return this.getDogBreeds();
    }
  }

  private getDogBreeds(): Observable<Breed[]> {
    return this.getArrayOf<Breed>(this.dogBreeds);
  }

  private getCatsBreeds(): Observable<Breed[]> {
    return this.getArrayOf<Breed>(this.catBreeds);
  }

  public tableFilter(
    pettable: Array<Pet>,
    petFilterInfo: PetFilterEvent
  ): Array<Pet> {
    console.log(petFilterInfo.id)
    switch (petFilterInfo.filterType) {
      case 'breed':
        return pettable.filter((pet) => pet.breed_id === petFilterInfo.id);
      case 'gender':
        return pettable.filter((pet) => pet.gender_id === petFilterInfo.id);
      case 'size':
        return pettable.filter((pet) => pet.size_id === petFilterInfo.id);
      default:
        return pettable;
    }
  }
}
