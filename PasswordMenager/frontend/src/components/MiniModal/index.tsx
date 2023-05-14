import { Entry } from "../../utils/entry.utils";
import { ListComponent, ListItem } from "./component.styled";

type MoreMiniModal = {
  entry: IEntry;
  refreshgroupentities: Function;
  setentrytoedit: Function;
  seteditmodalopen: Function;
  modalClose: Function;
};
export const ModalButtonChoicer: React.FC<MoreMiniModal> = ({
  entry,
  refreshgroupentities,
  setentrytoedit,
  seteditmodalopen,
  modalClose,
}: MoreMiniModal): JSX.Element => {
  const deletehandle = async (entryid: string): Promise<void> => {
    const response: DeleteEntryResponse =
      await Entry.getInstance().DeleteUserEntry(entryid);
    if (response.status) {
      refreshgroupentities();
      modalClose();
    }
  };
  const onedithandle = (entryid: string): void => {
    setentrytoedit(entryid);
    seteditmodalopen(true);
    modalClose();
  };
  return (
    <ListComponent id={entry._id}>
      <ListItem onClick={() => deletehandle(entry._id)}>Delete</ListItem>
      <ListItem onClick={() => onedithandle(entry._id)}>Edit</ListItem>
    </ListComponent>
  );
};
