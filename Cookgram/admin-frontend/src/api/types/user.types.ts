import { Role } from "../../app/shared/types/enums";

export type CreateUserObject = {
    username: string;
    password: string;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    credentials: UserCredentials;
    address?: UserAddress;
};

type UserAddress = {
    address: string;
    house: string;
    door?: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    postalCode: string;
}
type UserCredentials = {
    username: string;
    password: string;
    passwordIsTemporary: boolean;
}