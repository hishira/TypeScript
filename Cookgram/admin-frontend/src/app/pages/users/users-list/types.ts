export type UserAddressList = {
  address: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
};
export type UserList = {
  username: string;
  last_name: string | null;
  id: string;
  first_name: string | null;
  email: string;
  contract_id: string | null;
  address: UserAddressList;
};
