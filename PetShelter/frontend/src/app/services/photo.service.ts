import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Photo} from "../models/photo.model";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private mainurl: string = 'http://127.0.0.1:8000';
  private photourl: string = `${this.mainurl}/pet/photos`;
  constructor(
    private http: HttpClient,
  ) { }

  

  public getPetPhotos(petid: number):Observable<Photo[]>{
    return this.http.get<Photo[]>(this.getPetPhotoUrl(petid))
  }

  private getPetPhotoUrl(petid:number):string{
    return `${this.photourl}/${petid}`
  }
}
