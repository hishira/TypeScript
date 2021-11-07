import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {ApiService} from "./api.service";
import { Observable } from "rxjs";
import { Gender } from '../models/gender.model';
import { PetSize } from '../models/PetSize.model';
import { Breed } from "../models/breed.model";

@Injectable({
    providedIn: "root"
})
export class PetFilterService extends ApiService{

    private readonly petGenders: string     = this.getUrl('gender');
    private readonly petSize:    string     = this.getUrl('petsize');
    private readonly dogBreeds:  string     = this.getUrl('breed/dog');
    private readonly catBreeds:  string     = this.getUrl('breed/cat');

    constructor(http: HttpClient){
        super(http);
    }

    public getGenderPet(): Observable<Gender[]> {
        return this.getArrayOf<Gender>(this.petGenders);
    }

    public getPetSize(): Observable<PetSize[]> {
        return this.getArrayOf<PetSize>(this.petSize);
    }

    public getDogBreeds(): Observable<Breed[]> {
        return this.getArrayOf<Breed>(this.dogBreeds);
    }

    public getCatsBreeds(): Observable<Breed[]> {
        return this.getArrayOf<Breed>(this.catBreeds);
    }
    
}