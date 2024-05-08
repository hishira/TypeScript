import { FilterQuery } from 'mongoose';
import { FilterOption } from '../Interfaces/filteroption.interface';
import { IUser } from '../Interfaces/user.interface';

export class UserUtils {
  static get allUserFilterOption(): FilterOption<FilterQuery<IUser>> {
    return {
      getOption(): Record<string, never> {
        return {};
      },
    };
  }

  static GetFirstUserFromTableOrNull(users: IUser[]): IUser | null {
    return users?.length > 0 ? users[0] : null;
  }
}
