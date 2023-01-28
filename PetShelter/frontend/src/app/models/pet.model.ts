import { Breed } from "./breed.model";
import { Center } from "./center.model";
import { Gender } from "./gender.model";
import { PetSize } from "./petsize.model";
import { PetType } from "./PetType.model";

export class Pet{
    breed: Breed;
    breed_id: number;
    brithdate: Date;
    center: Center;
    center_id: number;
    description: string;
    gender: Gender;
    gender_id: number;
    id: number;
    name: string;
    petType: PetType;
    pettype_id: number;
    short_description: string;
    size: PetSize;
    size_id: number;
    weight: number;

}