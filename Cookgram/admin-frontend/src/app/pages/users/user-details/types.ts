export enum UserState {
  Draft = "Draft",
  Active = "Active",
  Suspend = "Suspend",
  Frozen = "Frozen",
  Retired = "Retired",
  Deleted = "Deleted"
}

export enum Gender {
  Man = "Man",
  Woman = "Woman",
  None = "None"
}

export enum Roles {
  User = "User",
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
  Employee = "Employee",
  Manager = "Manager",
  Director = "Director"
}

export interface UserDetails {
  id: string;
  personalInformation: {
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
  credentials: {
    username: string;
  };
  address: string | null;
  meta: {
    id: string;
    createDate: string;
    editDate: string;
  };
  roles: Roles;
  state: {
    current: UserState;
    previous: string | null;
  };
}
