import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IEntry } from '../../schemas/Interfaces/entry.interface';
import { Paginator } from 'src/utils/paginator';

type DeleteEntryResponse = {
  status: boolean;
  respond: IEntry | null;
};

type EditEntryResponse = {
  status: boolean;
  respond: IEntry | null;
};

type GroupResponse =
  | IGroup[]
  | {
      data: IGroup[];
      pageInfo: Paginator;
    };

type UpdateEntryCheck = {
  noteUpdate: boolean;
  passwordUpdate: boolean | string;
  titleUpdate: boolean;
  userNameUpdate: boolean;
  stateUpdate: boolean;
};
