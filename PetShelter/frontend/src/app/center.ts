import { Pet } from "./pet";
export interface Center {
    id: number,
    name: string;
    city: string;
    address: string;
    phone: string;
    pets: Array<Pet>;
}