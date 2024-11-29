import { Role } from '../../app/shared/types/enums';
import { Nullable } from '../../app/shared/types/shared';

export type Partially<T> = T extends Object ? Partially<T> : Partial<T>;

export type CreateUserObject = {
  email: Nullable<string>;
  role: Nullable<Role>;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  credentials: Partial<UserCredentials>;
  address?: Nullable<UserAddress>;
};

export type UserAddress = {
  address: string;
  house: string;
  door?: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  postalCode: string;
};
export type UserCredentials = {
  username: string;
  password: string;
  passwordIsTemporary: boolean;
};
