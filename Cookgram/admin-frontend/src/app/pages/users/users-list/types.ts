import { Gender, Role, State } from '../../../shared/types/enums';
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
    email: string | null;
    phone: string | null;
    fax: string | null;
  };
};

export type UserList = {
  personalInformation: UserPersonaInformation;
  fullName: string;
  credentials: {
    username: string;
  };
  id: string;
  address: UserAddressList;
  meta: {
    id: string;
    crateDate: string;
    editDate: string;
  };
  roles: Role;
  state: {
    current: State;
    previousState: State;
  };
};
