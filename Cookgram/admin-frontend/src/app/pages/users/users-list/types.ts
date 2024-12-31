import { Optional } from '../../../shared/types/shared';

export type UserAddressList = {
  address: Optional<string>;
  city: Optional<string>;
  country: Optional<string>;
  phone: Optional<string>;
};

export type UserList = {
  username: string;
  lastName: Optional<string>;
  id: string;
  firstName: Optional<string>;
  email: string;
  contractId: Optional<string>;
  address: UserAddressList;
};
