import { Role } from '../../../../../shared/types/enums';

type RoleMap = {
  [key in Role]: Role[];
};

const RoleMapper: RoleMap = {
  [Role.User]: [],
  [Role.Employee]: [],
  [Role.Manager]: [Role.Employee],
  [Role.Director]: [Role.Employee, Role.Manager],
  [Role.Admin]: [Role.User, Role.Employee, Role.Manager, Role.Director],
  [Role.SuperAdmin]: [
    Role.User,
    Role.Employee,
    Role.Manager,
    Role.Director,
    Role.Admin,
  ],
};
export const PrepareRoles = (currentRole: Role): Role[] =>
  RoleMapper[currentRole];
