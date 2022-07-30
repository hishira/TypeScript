import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PetGQL, PetQuery, PetSchema } from '../types/types';
import { PetTypeEnum } from '../models/PetType.model';
import { ApolloQueryResult } from '@apollo/client/core';
@Injectable({
  providedIn: 'root',
})
export class PetService extends ApiService {

  private readonly getAllCats: string = this.getUrl('pet/getallcat');
  private readonly getAllDogs: string = this.getUrl('pet/getalldog');
  private readonly getPetByIdURL: string = this.getUrl('pet/byid/');
  private readonly getpetsbycenterurl: string = this.getUrl('pets/');

  constructor(http: HttpClient, private petGQL: PetGQL) {
    super(http);
  }

  getCats(): Observable<ApolloQueryResult<PetQuery>>{
    return this.petGQL.watch({petFilter: {petTypeId: {eq: PetTypeEnum.Cat}}}).valueChanges
  }

  getDogs(): Observable<ApolloQueryResult<PetQuery>> {
    return this.petGQL.watch({petFilter: {petTypeId: {eq: PetTypeEnum.Dog}}}).valueChanges;
  }
  
  getOnlyCats(): Observable<Pet[]> {
    const geturl: string = `${this.getAllCats}`;
    return this.getArrayOf<Pet>(geturl);
  }

  getOnlyDogs(): Observable<Pet[]> {
    const geturl: string = this.getAllDogs;
    return this.getArrayOf<Pet>(geturl);
  }

  getPetById(petId: number): Observable<Pet> {
    let url: string = `${this.getPetByIdURL}${petId}`;
    return this.getTypeOf<Pet>(url);
  }
  
  getPetsByCenter(centerid: number): Observable<Pet[]> {
    let geturl: string = `${this.getpetsbycenterurl}${centerid}`;
    return this.getArrayOf<Pet>(geturl);
  }
}
