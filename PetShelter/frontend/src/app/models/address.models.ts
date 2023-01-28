import { AdressSchema } from "../types/types";

export class Address {
    address: string;
    city: string;
    country: string;
    id: number;
    lat: number;
    lng: number;
}

export function getFullAddress(address: AdressSchema): string {
    return `${address.address}, ${address.city} ${address.country}`
}