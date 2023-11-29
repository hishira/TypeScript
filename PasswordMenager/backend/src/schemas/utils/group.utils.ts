import { GroupNotExists } from 'src/errors/GroupNotExists.error';
import { IGroup } from '../Interfaces/group.interface';

type Optional<T> = T | undefined | null;

export class GroupUtils {
  static EmptyGroupGuard(group: Optional<IGroup>): IGroup {
    if (group === null || group === undefined) throw new GroupNotExists();
    return group;
  }
}
