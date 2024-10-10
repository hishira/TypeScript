import { createAction, props } from "@ngrx/store";
import { CurrentUser } from "./curentUser.enum";
import { ContextUser } from "../../app/shared/types/shared";

export const GetCurrentUserAction = createAction(CurrentUser.GetCurrentUser);
export const SetCurrentUserAction = createAction(CurrentUser.SetCurrentUser, props<ContextUser>());
