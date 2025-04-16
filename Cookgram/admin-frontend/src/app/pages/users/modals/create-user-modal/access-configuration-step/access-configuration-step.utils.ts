import { Role } from '../../../../../shared/types/enums';

const RoleHierarchy: Record<Role, Role[]> = {
  [Role.User]: [],
  [Role.Employee]: [],
  [Role.Manager]: [Role.Employee],
  [Role.Director]: [Role.Employee, Role.Manager],
  [Role.Admin]: [Role.Employee, Role.Manager, Role.User, Role.Director],
  [Role.SuperAdmin]: [
    Role.Employee,
    Role.Manager,
    Role.User,
    Role.Director,
    Role.Admin,
  ],
  [Role.All]: [
    Role.Employee,
    Role.Manager,
    Role.User,
    Role.Director,
    Role.Admin,
    Role.SuperAdmin,
  ],
};

export const PrepareRoles = (currentRole: Role): Role[] =>
  RoleHierarchy[currentRole];
