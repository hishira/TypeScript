import { Optional } from '../../../shared/types/shared';

export type UserAddressList = {
  address: Optional<string>;
  city: Optional<string>;
  country: Optional<string>;
  phone: Optional<string>;
};

export type UserList = {
  username: string;
  last_name: Optional<string>;
  id: string;
  first_name: Optional<string>;
  email: string;
  contract_id: Optional<string>;
  address: UserAddressList;
};
