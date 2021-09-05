import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Pet} from "./pet";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private mainurl: string = "http://127.0.0.1:8000";
  private getpetsbycenterurl: string = `${this.mainurl}/pets/`;

  constructor(private http: HttpClient) { }
  public getPetsByCenter(centerid: number): Observable<Pet[]>{
    let geturl: string = `${this.getpetsbycenterurl}${centerid}`;
    return this.http.get<Pet[]>(geturl);
  }
}
