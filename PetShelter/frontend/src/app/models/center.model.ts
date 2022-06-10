import { Pet } from "./pet.model";
export interface Center {
    address: string;
    city: string;
    description: string,
    id: number,
    name: string;
    pets: Array<Pet>;
    phone: string;
}