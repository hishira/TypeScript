import { Role } from '../../../../../shared/types/enums';
import { RoleMap } from '../../../../../shared/types/shared';

const EmptyRoles: Role[] = [];

const ManagerRoles: Role[] = [Role.Employee];

const DirectorRoles: Role[] = [...ManagerRoles, Role.Manager];

const AdminRoles: Role[] = [...DirectorRoles, Role.User, Role.Director];

const SuperAdminRoles: Role[] = [
  ...AdminRoles,
  Role.Admin,
];

const RoleMapper: RoleMap = {
  [Role.User]: EmptyRoles,
  [Role.Employee]: EmptyRoles,
  [Role.Manager]: ManagerRoles,
  [Role.Director]: DirectorRoles,
  [Role.Admin]: AdminRoles,
  [Role.SuperAdmin]: SuperAdminRoles,
};

export const PrepareRoles = (currentRole: Role): Role[] =>
  RoleMapper[currentRole];
