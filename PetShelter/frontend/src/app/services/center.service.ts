import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Center } from "../models/center.model";
import { Observable, of, OperatorFunction } from "rxjs"
import { catchError } from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class CenterService {
  private mainurl: string = "http://127.0.0.1:8000";
  private createurl: string = "/center/";
  private getalurl: string = "/centers";
  private getcenterurl: string = `${this.mainurl}/centers/`
  private getCentersUser(): string {
    return `${this.mainurl}${this.getalurl}`
  }
  constructor(private http: HttpClient) { }

  private logmessage(message: string): void {
    console.log(message);
  }

  private errorHandle<T>(operationname: string, whattoreturn?: T): OperatorFunction<T[], any> {
    return (err: any): Observable<T> => {
      this.logmessage(`Error at ${operationname}`)
      return of(whattoreturn as T);
    }
  }

  public getCenters(): Observable<Center[]> {
    return this.http
      .get<Center[]>(this.getCentersUser())
      .pipe(catchError(this.errorHandle("getCenters", [])))
  }
  
  public getcenterbyid(centerid:number):Observable<Center>{
    return this.http
            .get<Center>(`${this.getcenterurl}${centerid}`)
            .pipe(catchError(
              this.errorHandle("getcenterbyid",[])
              ));
  }
}