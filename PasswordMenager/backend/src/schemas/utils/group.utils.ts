import { GroupNotExists } from 'src/errors/GroupNotExists.error';
import { IGroup } from '../Interfaces/group.interface';
import { BaseError } from 'src/errors/bace-error';

type Optional<T> = T | undefined | null;

export class GroupUtils {
  static EmptyGroupGuard(group: Optional<IGroup | BaseError>): IGroup {
    if (
      group === null ||
      group === undefined ||
      GroupUtils.IsGroupBaseError(group)
    )
      throw new GroupNotExists();
    return group;
  }

  static IsGroupBaseError(
    group: Optional<IGroup | BaseError>,
  ): group is BaseError {
    return group !== null && 'message' in group;
  }
}
