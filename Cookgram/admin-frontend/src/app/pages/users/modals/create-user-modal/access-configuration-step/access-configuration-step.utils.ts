import { Role } from '../../../../../shared/types/enums';
import { RoleMap } from '../../../../../shared/types/shared';

const EmptyRoles:  Role[] = [];

const ManagerRoles:  Role[] = [Role.Employee];

const DirectorRoles:  Role[] = [Role.Employee, Role.Manager];

const AdminRoles:  Role[] = [Role.User, Role.Employee, Role.Manager, Role.Director];

const SuperAdminRoles: Role[] = [
  Role.User,
  Role.Employee,
  Role.Manager,
  Role.Director,
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
