import { Pet } from "./pet.model";
export interface Center {
    address: string;
    city: string;
    id: number,
    name: string;
    pets: Array<Pet>;
    phone: string;
}