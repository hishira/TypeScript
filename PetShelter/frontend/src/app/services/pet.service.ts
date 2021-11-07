import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.model';
import { Observable } from 'rxjs';
import {ApiService} from "./api.service"
@Injectable({
  providedIn: 'root',
})
export class PetService extends ApiService {
  private readonly getpetsbycenterurl: string = this.getUrl('pets/');//`${this.mainurl}/pets/`;
  private readonly getAllCats: string = this.getUrl('pet/getallcat');//`${this.mainurl}/
  private readonly getAllDogs: string = this.getUrl('pet/getalldog');

  constructor(http: HttpClient) {
    super(http);
  }
  
  public getPetsByCenter(centerid: number): Observable<Pet[]> {
    let geturl: string = `${this.getpetsbycenterurl}${centerid}`;
    return this.getArrayOf<Pet>(geturl);
  }

  public getOnlyCats(): Observable<Pet[]> {
    const geturl: string = `${this.getAllCats}`;
    return this.getArrayOf<Pet>(geturl);
  }

  public getOnlyDogs(): Observable<Pet[]>{
    const geturl: string = this.getAllDogs;
    return this.getArrayOf<Pet>(geturl);
  }
}
