import { Gender, Role } from '../../../shared/types/enums';
import { Optional } from '../../../shared/types/shared';

export type UserAddressList = {
  address: Optional<string>;
  city: Optional<string>;
  country: Optional<string>;
  phone: Optional<string>;
};

export type UserPersonaInformation = {
  firstName: string;
  lastName: string;
  brithday: string;
  email: string;
  gender: Gender;
  contacts: {
    email: string;
    phone: string;
    fax: string;
  };
};

export type UserList = {
  personalInformation: UserPersonaInformation;
  credentials: {
    username: string;
  };
  id: string;
  address: UserAddressList;
  roles: Role;
};
