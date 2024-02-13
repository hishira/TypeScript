import {
  IModelType,
  ISimpleType,
  IStateTreeNode,
  Instance,
  _NotCustomized,
  types,
} from "mobx-state-tree";
import { NonEmptyObject } from "mobx-state-tree/dist/internal";

export enum View {
  Table = "Table",
  Card = "Card",
}
export type PopUpStoreType = {
  type: string;
  message: string;
  open: boolean;
} & NonEmptyObject &
  IStateTreeNode<
    IModelType<
      {
        type: ISimpleType<string>;
        message: ISimpleType<string>;
        open: ISimpleType<boolean>;
      },
      {},
      _NotCustomized,
      _NotCustomized
    >
  >;
export const General = types
  .model({
    useractive: types.optional(types.boolean, false),
    popUpelement: types.model("Popup", {
      type: types.string,
      message: types.string,
      open: types.boolean,
    }),
    viewType: types.enumeration(Object.keys(View)),
    isLocal: types.boolean,
    refetchAfterEntryCreate: types.boolean,
  })
  .actions((self) => ({
    setUserActive(useractive: boolean): void {
      self.useractive = useractive;
    },
    setPopUpinfo(popupModel: PopUpStoreType): void {
      self.popUpelement = popupModel;
    },
    setViewType(viewType: View): void {
      self.viewType = viewType;
    },
    setIsLocal(isLocal: boolean): void {
      self.isLocal = isLocal;
    },
    setRefetchAfterEntryCreate(refetchAfterEntryCreate: boolean): void {
      self.refetchAfterEntryCreate = refetchAfterEntryCreate;
    },
  }))
  .views((self) => ({
    get UserActivity(): boolean {
      return self.useractive;
    },
    get PopUpModelInfo(): PopUpStoreType {
      return self.popUpelement;
    },
    get ViewType(): View {
      return self.viewType as View;
    },
    get IsLocal(): boolean {
      return self.isLocal;
    },
    get RefetchAfterEntryCreate(): boolean {
      return self.refetchAfterEntryCreate;
    },
  }));

export type IGeneral = Instance<typeof General>;
