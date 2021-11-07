import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class ApiService {
    private readonly mainurl: string = 'http://127.0.0.1:8000';
    constructor(private http: HttpClient){

    }
    public getUrl(url: string){
        return `${this.mainurl}/${url}`
    }
    public getArrayOf<T>(url:string):Observable<T[]>{
        return this.http.get<T[]>(url);
    }
}