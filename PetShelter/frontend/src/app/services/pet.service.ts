import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../pet';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly mainurl: string = 'http://127.0.0.1:8000';
  private readonly getpetsbycenterurl: string = `${this.mainurl}/pets/`;
  private readonly getAllCats: string = `${this.mainurl}/pet/getallcat`;
  private readonly getAllDogs: string = `${this.mainurl}/pet/getalldog`;

  constructor(private http: HttpClient) {}
  
  public getPetsByCenter(centerid: number): Observable<Pet[]> {
    let geturl: string = `${this.getpetsbycenterurl}${centerid}`;
    return this.http.get<Pet[]>(geturl);
  }

  public getOnlyCats(): Observable<Pet[]> {
    const geturl: string = `${this.getAllCats}`;
    return this.http.get<Pet[]>(geturl);
  }

  public getOnlyDogs(): Observable<Pet[]>{
    const geturl: string = this.getAllDogs;
    return this.http.get<Pet[]>(geturl);
  }
}
