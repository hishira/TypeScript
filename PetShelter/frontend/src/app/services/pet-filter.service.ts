import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender.model';
import { PetSize } from '../models/petsize.model';
import { Breed } from '../models/breed.model';
import { Pet } from '../models/pet.model';
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
    switch (pettype) {
      case 'Dog':
        return this.getDogBreeds();
      case 'Cat':
        return this.getCatsBreeds();
      default:
        return this.getDogBreeds();
    }
  }

  public tableFilter(
    pettable: Array<Pet>,
    petFilterMap: Map<string, (pet: Pet) => boolean>
  ): Array<Pet> {
    return pettable.filter((i) => this.allOf(i, petFilterMap));
  }

  private allOf(i: Pet, map: Map<string, (pet: Pet) => boolean>): boolean {
    let funtions = map.values();
    for (let f of funtions) {
      if (!f(i)) return false;
    }
    return true;
  }
  private getDogBreeds(): Observable<Breed[]> {
    return this.getArrayOf<Breed>(this.dogBreeds);
  }

  private getCatsBreeds(): Observable<Breed[]> {
    return this.getArrayOf<Breed>(this.catBreeds);
  }
}
