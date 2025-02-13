import { Gender, Role } from '../../app/shared/types/enums';
import { Nullable } from '../../app/shared/types/shared';

export type Partially<T> = T extends Object ? Partially<T> : Partial<T>;

export type CreateUserObject = {
  role?: Role;
  personalInformation: PersonalInformation;
  credentials: Partial<UserCredentials>;
  address?: Nullable<UserAddress>;
};

export type PersonalInformation = {
  firstName?: string;
  lastName?: string;
  brithday?: string;
  email?: string;
  gender: Gender;
  contacts?: Contact;
};

export type Contact = {
  email?: string;
  phone?: string;
  fax?: string;
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
