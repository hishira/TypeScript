export class Address {
    address: string;
    city: string;
    country: string;
    id: number;
    lat: number;
    lng: number;
}

export function getFullAddress(address: Address): string {
    return `${address.address}, ${address.city} ${address.country}`
}