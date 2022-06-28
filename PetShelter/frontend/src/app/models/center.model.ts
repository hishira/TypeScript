import { Address } from "./address.models";
import { Pet } from "./pet.model";
export interface Center {
    address: Address;
    city: string;
    description: string,
    email: string;
    id: number,
    name: string;
    pets: Array<Pet>;
    phone: string;
}