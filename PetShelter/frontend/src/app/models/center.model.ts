import { Pet } from "./pet.model";
export interface Center {
    id: number,
    name: string;
    city: string;
    address: string;
    phone: string;
    pets: Array<Pet>;
}